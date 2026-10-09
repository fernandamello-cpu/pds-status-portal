:root {
  --bg: #f3f3f3;
  --panel: #ffffff;
  --panel-soft: #f6f6f6;
  --text: #1a1a1a;
  --muted: #666666;
  --line: #d9d9d9;
  --brand: #0f1116;
  --brand-soft: #0a1f2b;
  --cyan: #62d0d9;
  --cyan-dark: #1287a9;
  --success: #2ebd7d;
  --warning: #e1a728;
  --danger: #d64d50;
  --shadow: 0 12px 30px rgba(15, 17, 22, 0.08);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background: var(--bg);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button, input, textarea, select {
  font: inherit;
}

.hidden {
  display: none !important;
}

.app-shell {
  min-height: 100vh;
}

.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at center, rgba(35, 162, 224, 0.18), transparent 35%), #05070a;
  padding: 20px;
}

.login-card {
  width: min(100%, 440px);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  border-radius: 20px;
  padding: 28px 26px 22px;
  backdrop-filter: blur(8px);
}

.logo-block {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}

.deloitte-logo {
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.08em;
  line-height: 1;
}

.deloitte-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #7fe16e;
  margin-left: 2px;
  display: inline-block;
  transform: translateY(-18px);
}

.login-title {
  color: white;
  margin: 0 0 10px;
  font-size: 1.45rem;
  font-weight: 700;
}

.login-subtitle {
  color: rgba(255, 255, 255, 0.75);
  margin: 0 0 22px;
  font-size: 0.95rem;
}

.form-grid {
  display: grid;
  gap: 16px;
}

.input-wrap {
  display: grid;
  gap: 8px;
}

.input-wrap label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  font-weight: 600;
}

.input-wrap input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: white;
  border-radius: 10px;
  min-height: 48px;
  padding: 0 14px;
}

.input-wrap input:focus {
  outline: 2px solid rgba(98, 208, 217, 0.7);
  border-color: transparent;
}

.primary-btn {
  border: none;
  border-radius: 10px;
  min-height: 48px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
  background: linear-gradient(135deg, #2ad0d4, #4ac7e1);
  color: #031319;
}

.primary-btn:hover {
  filter: brightness(1.06);
}

.secondary-btn {
  border: 1px solid var(--line);
  background: white;
  color: var(--text);
  border-radius: 10px;
  min-height: 42px;
  padding: 0 16px;
  cursor: pointer;
  font-weight: 600;
}

.inline-notice {
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 0.8rem;
  display: none;
}

.inline-notice.error {
  display: block;
  background: rgba(214, 77, 80, 0.12);
  border: 1px solid rgba(214, 77, 80, 0.25);
  color: #f2d2d2;
}

.inline-notice.success {
  display: block;
  background: rgba(46, 189, 125, 0.12);
  border: 1px solid rgba(46, 189, 125, 0.25);
  color: #d6f2e6;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  background: #0d1117;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.08em;
}

.brand-mark .dot {
  width: 10px;
  height: 10px;
  display: inline-block;
  background: #7fe16e;
  border-radius: 50%;
  margin-left: 2px;
  vertical-align: top;
  transform: translateY(-14px);
}

.user-box {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-pill {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 0.9rem;
}

.logout-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
}

.content {
  max-width: 1280px;
  margin: 32px auto;
  padding: 0 24px 40px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.metric-card {
  background: var(--panel);
  border-radius: 18px;
  box-shadow: var(--shadow);
  border: 1px solid var(--line);
  padding: 18px 20px;
}

.metric-label {
  color: var(--muted);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.metric-value {
  font-weight: 800;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  margin-top: 12px;
}

.layout-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 22px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: var(--shadow);
  padding: 18px 20px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.panel-title {
  font-size: 1.3rem;
  font-weight: 800;
  margin: 0;
}

.week-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: #eaf7f9;
  color: var(--cyan-dark);
  font-weight: 700;
  font-size: 0.8rem;
}

.form-grid-2 {
  display: grid;
  gap: 14px;
}

.field {
  display: grid;
  gap: 8px;
}

.field label {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.field input,
.field textarea,
.field select {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fafafa;
  padding: 12px 14px;
  color: var(--text);
}

.field textarea {
  min-height: 110px;
  resize: vertical;
}

.action-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
}

.status-list {
  display: grid;
  gap: 12px;
}

.status-row {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--panel-soft);
  border: 1px solid var(--line);
}

.person {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
}

.avatar {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #c7f3f5, #8ddfe5);
  color: #0b2d36;
  font-size: 0.8rem;
  font-weight: 800;
}

.role-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.72rem;
  background: #eef5f4;
  color: var(--brand-soft);
  font-weight: 700;
}

.muted {
  color: var(--muted);
}

.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.7rem;
  border: 1px solid transparent;
}

.pill.status-sembloqueios { background: rgba(46, 189, 125, 0.12); color: #1a8d5d; }
.pill.status-emdesenvolvimento { background: rgba(88, 161, 241, 0.12); color: #2d63b7; }
.pill.status-aguardandavalidacao { background: rgba(225, 167, 40, 0.12); color: #8a6100; }
.pill.status-emrisco { background: rgba(214, 77, 80, 0.12); color: #9e2d31; }
.pill.status-concluído { background: rgba(44, 126, 88, 0.12); color: #176049; }

.report-preview {
  margin-top: 12px;
  border: 1px solid var(--line);
  background: #fafafa;
  border-radius: 12px;
  padding: 16px;
}

.preview-title {
  font-weight: 800;
  margin-bottom: 10px;
}

.preview-lines {
  line-height: 1.6;
  color: var(--text);
  white-space: pre-wrap;
}

@media (max-width: 980px) {
  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .layout-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .content {
    padding: 0 16px 32px;
  }
}
