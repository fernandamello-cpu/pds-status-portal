# Portal PDS Semanal

Portal profissional para atualização semanal de status de consultores, com autenticação, dashboard de acompanhamento e exportação para PDF.

## Funcionalidades
- Login com email e password
- Dashboard consolidado por equipa
- Atualização semanal por consultor
- Histórico por semana
- Exportação para PDF
- Identidade visual corporativa inspirada em Deloitte
- Estrutura pronta para customização com logo e cores da empresa

## Utilizadores padrão
- Admin: admin@deloitte.pt / Deloitte2026!
- Basis: basis@deloitte.pt / Deloitte2026!
- ABAP: abap@deloitte.pt / Deloitte2026!
- Suporte: suporte@deloitte.pt / Deloitte2026!

## Tecnologias
- Node.js
- Express
- JWT
- Bcrypt
- HTML/CSS/JavaScript

## Como iniciar

```bash
npm install
npm start
```

Depois acede em:

```text
http://localhost:3000
```

## Estrutura do projeto

```text
pds-status-portal/
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── data/
│   └── store.json
├── .gitignore
├── package.json
├── README.md
├── server.js
└── LICENSE
```

## Personalização
Para adaptar ao logo e à identidade da sua empresa:
- Atualize os ficheiros em `public/styles.css`
- Substitua o texto do logotipo no `public/index.html`
- Adicione o seu logótipo na pasta `public/assets` e referencie-o no CSS ou HTML

## Observações
Este projeto é um protótipo funcional para demonstração e uso interno. Pode ser expandido para integração com bases de dados, autenticação SSO, e exportação PDF mais avançada.
