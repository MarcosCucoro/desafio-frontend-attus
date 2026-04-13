# 📌 Projeto Angular - Gestão de Usuários

Aplicação desenvolvida em **Angular** para gerenciamento de usuários, utilizando **Angular Material** para interface e **JSON Server** para simular uma API REST.

---

## 🚀 Tecnologias

- Angular (v21)
- Angular Material
- RxJS
- TypeScript
- JSON Server

---

## 📦 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/MarcosCucoro/desafio-frontend-attus.git
cd desafio-frontend-attus
```
### 2. Instalar dependências

```bash
npm install
```
## 🧪 Executando o projeto

### 1. Subir o JSON Server (API fake)
#### Instalar no projeto

```bash
npm install json-server --save-dev
```

### 2. Criar o arquivo db.json
#### Na raiz do projeto, crie
```json
{
  "users": []
}
```

### 3. Iniciar o servidor
```bash
json-server --watch db.json --port 3000
```
#### A API estará disponível em
```bash
http://localhost:3000/users
```

### 4. Rodar a aplicação Angular
```bash
ng serve
```
#### Acesse no navegador
```bash
http://localhost:4200
```

## 📌 Funcionalidades
- ✅ Listagem de usuários
- ✅ Cadastro de usuários
- ✅ Edição de usuários
- ✅ Exclusão com confirmação
- ✅ Busca com debounce
- ✅ Paginação com Angular Material
- ✅ Validação de formulário
- ✅ Máscara de CPF e telefone
- ✅ Feedback com Snackbar (sucesso/erro)
- ✅ Dark / Light mode
- ✅ Skeleton loading (efeito de carregamento)

## 🔄 Endpoints da API (JSON Server)
### 📥 GET
```bash
GET /users
GET /users/:id
```
### 📤 POST
```bash
POST /users
```
### 🔄 PUT
```bash
PUT /users/:id
```
### ❌ DELETE
```bash
DELETE /users/:id
```
## 🧠 Observações
- O ID dos usuários é gerado automaticamente pelo JSON Server.
- A busca é feita localmente (client-side).
- O estado da listagem é atualizado automaticamente após operações de CRUD.
- Utiliza Reactive Forms para validação.

## 🛠 Scripts úteis
### Adicione no seu package.json
```json
"scripts": {
  "start": "ng serve",
  "server": "json-server --watch db.json --port 3000"
}
```
### Rodar em paralelo
```bash
npm run server
npm start
```
## 🎨 Interface
- Angular Material
- Layout responsivo
- Feedback visual com Snackbar
- Tema Dark / Light
- Design minimalista

## 👨‍💻 Autor
### Desenvolvido por Marcos Cucoro

