# Backend API — Autenticação e Autorização

Backend RESTful com autenticação JWT, controle de acesso por roles e CRUD completo de usuários.

## Tecnologias

- **Node.js**
- **Express**
- **MongoDB** (Atlas)
- **Prisma** v6
- **JWT** (jsonwebtoken)
- **Bcryptjs**

---

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/nomebanco?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET="sua_chave_secreta"
```

### 3. Gerar o Prisma Client

```bash
npx prisma generate
```

### 4. Sincronizar o schema com o banco

```bash
npx prisma db push
```

### 5. Rodar o servidor

```bash
npm run dev
```

---

## Rotas

### Autenticação — `/auth`

#### Registrar usuário

```
POST /auth/register
```

**Body:**

```json
{
  "name": "NomeUsuario",
  "email": "usuario@email.com",
  "password": "123456"
}
```

**Resposta (201):**

```json
{
  "message": "Usuário criado com sucesso!",
  "user": {
    "id": "6a1615618341e911b7b0e1bd",
    "name": "NomeUsuario",
    "email": "usuario@email.com",
    "role": "user"
  }
}
```

---

#### Login

```
POST /auth/login
```

**Body:**

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

**Resposta (200):**

```json
{
  "message": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Usuários — `/users`

> Todas as rotas abaixo exigem token de admin no header.

```
Authorization: Bearer <token>
```

---

#### Listar todos os usuários

```
GET /users
```

**Resposta (200):**

```json
{
  "message": "Usuários listados com sucesso!",
  "total": 2,
  "users": [
    {
      "id": "6a1615618341e911b7b0e1bd",
      "name": "Alan Campos",
      "email": "alan@email.com",
      "role": "user",
      "createdAt": "2026-05-26T21:49:21.292Z",
      "updatedAt": "2026-05-26T21:49:21.292Z"
    }
  ]
}
```

---

#### Buscar usuário por ID

```
GET /users/:id
```

**Resposta (200):**

```json
{
  "user": {
    "id": "6a1615618341e911b7b0e1bd",
    "name": "Alan Campos",
    "email": "alan@email.com",
    "role": "user",
    "createdAt": "2026-05-26T21:49:21.292Z",
    "updatedAt": "2026-05-26T21:49:21.292Z"
  }
}
```

---

#### Atualizar usuário

```
PUT /users/:id
```

**Body (todos os campos são opcionais):**

```json
{
  "name": "Alan Campos Silva",
  "email": "novoemail@email.com",
  "password": "novasenha"
}
```

**Resposta (200):**

```json
{
  "message": "Usuário atualizado com sucesso!",
  "user": {
    "id": "6a1615618341e911b7b0e1bd",
    "name": "Alan Campos Silva",
    "email": "novoemail@email.com",
    "role": "user",
    "updatedAt": "2026-05-26T23:20:55.909Z"
  }
}
```

---

#### Deletar usuário

```
DELETE /users/:id
```

**Resposta (200):**

```json
{
  "message": "Usuário deletado com sucesso!"
}
```

---

### Admin — `/admin`

> Exige token de admin no header.

```
Authorization: Bearer <token>
```

#### Dashboard

```
GET /admin/dashboard
```

**Resposta (200):**

```json
{
  "message": "Bem vindo à área admin!",
  "user": {
    "id": "6a16206b4bdcfdc8b19cf01e",
    "role": "admin",
    "iat": 1779835260,
    "exp": 1779921660
  }
}
```

---

## Códigos de resposta

| Código | Significado                 |
| ------ | --------------------------- |
| 200    | Sucesso                     |
| 201    | Criado com sucesso          |
| 400    | Dados inválidos ou ausentes |
| 401    | Token ausente ou inválido   |
| 403    | Sem permissão de acesso     |
| 404    | Recurso não encontrado      |
| 500    | Erro interno do servidor    |

---

## Roles

| Role    | Acesso                |
| ------- | --------------------- |
| `user`  | Rotas públicas apenas |
| `admin` | Todas as rotas        |

> Para tornar um usuário admin, altere o campo `role` diretamente no MongoDB Atlas de `"user"` para `"admin"`.

---

## Estrutura do projeto

```
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── database/
│   │   └── prisma.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   └── userRoutes.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
```
