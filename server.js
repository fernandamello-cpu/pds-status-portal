const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "deloitte-pds-secret-2026";
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "public")));

function ensureDataStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    const initialStore = {
      users: [],
      reports: []
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialStore, null, 2));
  }
}

function readData() {
  ensureDataStore();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function sanitizeUser(user) {
  if (!user) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

function findUserById(userId) {
  const data = readData();
  return data.users.find((user) => user.id === userId) || null;
}

function getUserByEmail(email) {
  const data = readData();
  return data.users.find((user) => user.email.toLowerCase() === String(email).toLowerCase()) || null;
}

function getWeekLabel(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function getStatusOptions() {
  return [
    "Sem bloqueios",
    "Em desenvolvimento",
    "Aguardando validação",
    "Em risco",
    "Concluído"
  ];
}

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "8h" }
  );
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Autenticação necessária." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
}

async function seedUsers() {
  const data = readData();

  if (data.users.length > 0) {
    return;
  }

  const defaultUsers = [
    {
      id: "admin-01",
      name: "Administração",
      email: "admin@deloitte.pt",
      role: "Admin",
      passwordHash: bcrypt.hashSync("Deloitte2026!", 10),
      area: "Gestão"
    },
    {
      id: "consultor-01",
      name: "Maria Silva",
      email: "basis@deloitte.pt",
      role: "Consultor",
      passwordHash: bcrypt.hashSync("Deloitte2026!", 10),
      area: "Basis"
    },
    {
      id: "consultor-02",
      name: "João Pereira",
      email: "abap@deloitte.pt",
      role: "Consultor",
      passwordHash: bcrypt.hashSync("Deloitte2026!", 10),
      area: "ABAP"
    },
    {
      id: "consultor-03",
      name: "Ana Costa",
      email: "suporte@deloitte.pt",
      role: "Consultor",
      passwordHash: bcrypt.hashSync("Deloitte2026!", 10),
      area: "Suporte"
    }
  ];

  data.users = defaultUsers;
  writeData(data);
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Portal PDS operativo." });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email e password são obrigatórios." });
  }

  await seedUsers();

  const user = getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const token = createToken(user);

  res.json({
    token,
    user: sanitizeUser(user)
  });
});

app.get("/api/me", requireAuth, (req, res) => {
  const user = findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "Utilizador não encontrado." });
  }

  res.json({ user: sanitizeUser(user) });
});

app.get("/api/users", requireAuth, (req, res) => {
  const data = readData();
  const users = data.users.map((user) => sanitizeUser(user));
  res.json({ users });
});

app.get("/api/summary", requireAuth, (req, res) => {
  const data = readData();
  const week = req.query.week || getWeekLabel();

  const records = data.users.map((user) => {
    const report = data.reports.find((item) => item.userId === user.id && item.week === week) || null;
    return {
      ...sanitizeUser(user),
      report
    };
  });

  const total = records.length;
  const completed = records.filter((item) => item.report).length;
  const statusCounts = getStatusOptions().reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {});

  records.forEach((item) => {
    if (item.report && item.report.status) {
      statusCounts[item.report.status] = (statusCounts[item.report.status] || 0) + 1;
    }
  });

  res.json({
    week,
    total,
    completed,
    statusCounts,
    records
  });
});

app.get("/api/reports", requireAuth, (req, res) => {
  const data = readData();
  const week = req.query.week || getWeekLabel();
  const reportData = data.reports.filter((item) => item.week === week);
  res.json({ week, reports: reportData });
});

app.post("/api/reports", requireAuth, (req, res) => {
  const data = readData();
  const { week, status, summary, blockers, risks, nextSteps } = req.body || {};

  if (!week || !status || !summary) {
    return res.status(400).json({ message: "Semana, status e resumo são obrigatórios." });
  }

  const existingIndex = data.reports.findIndex(
    (item) => item.userId === req.user.id && item.week === week
  );

  const payload = {
    id: existingIndex >= 0 ? data.reports[existingIndex].id : uuidv4(),
    userId: req.user.id,
    week,
    status,
    summary,
    blockers: blockers || "",
    risks: risks || "",
    nextSteps: nextSteps || "",
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    data.reports[existingIndex] = payload;
  } else {
    data.reports.unshift(payload);
  }

  writeData(data);
  res.status(200).json({ message: "Status atualizado com sucesso.", report: payload });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

async function startServer() {
  await seedUsers();
  app.listen(PORT, () => {
    console.log(`Portal PDS a correr em http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Erro ao iniciar o servidor:", error);
  process.exit(1);
});
