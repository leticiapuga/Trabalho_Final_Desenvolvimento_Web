# API — Aplicação Acadêmica (Node.js + Sequelize + PostgreSQL)

Backend da aplicação acadêmica desenvolvido com **Node.js**, **Sequelize** e **PostgreSQL**.  
O projeto também possui um **frontend** em uma pasta separada feito com HTML, CSS e React.

---

##  Pré-requisitos

- **Node.js** (>= 20)
- **PostgreSQL** instalado e rodando localmente

---

##  Configuração

### 1) Configurar o banco de dados
1. Crie um banco de dados no PostgreSQL.
2. Copie o arquivo `.env` (ou crie um `.env` na raiz do projeto) e configure as variáveis:

```env
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASS=senha
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=algumsegredoaqui
PORT=3000
```

### 2) Instalar dependências e rodar o backend
No diretório `projetofinal_web-master`:

```sh
npm install
npm run dev
# ou
npm start
```

### 3) Instalar dependências e rodar o frontend
No diretório `projetofinal_web-master/frontend`:

```sh
npm install
npm start
```

---

##  Endpoints principais

- `POST /api/auth/register`  
  **Body:** `{ "name": "...", "email": "...", "password": "..." }`

- `POST /api/auth/login`  
  **Body:** `{ "email": "...", "password": "..." }`

- `GET /api/me`  
  **Auth:** `Bearer <token>`

---

##  Outros endpoints (exemplos)

- `/api/auth`
- `/api/alunos`
- `/api/professores`
- `/api/cursos`
- `/api/disciplinas`
- `/api/turmas`
- `/api/matriculas`
