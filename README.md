# 📋 App Lista de Tarefas

Aplicação web de gerenciamento de tarefas desenvolvida com **Node.js, Express, MongoDB, HTML, CSS e JavaScript**.

O projeto permite cadastrar, editar, concluir, reabrir e excluir tarefas, além de utilizar filtros, pesquisa, prioridades e lembretes através de notificações do navegador.

## 🚀 Funcionalidades

* ✅ Cadastro de tarefas
* ✏️ Edição de tarefas
* 🗑️ Exclusão de tarefas com confirmação
* ✔️ Conclusão de tarefas
* 🔄 Reabertura de tarefas concluídas
* 🔴🟡🟢 Definição de prioridade
* 🔎 Pesquisa de tarefas
* 🔽 Filtro por prioridade
* 📅 Ordenação por data
* 🔤 Ordenação por nome
* 🔔 Notificações para lembretes
* 📝 Exibição da descrição da tarefa na notificação
* 📊 Separação entre tarefas pendentes e concluídas
* 🔢 Contador de tarefas pendentes e concluídas

## 🛠️ Tecnologias utilizadas

### Backend

* Node.js
* Express
* MongoDB
* MongoDB Driver
* dotenv

### Frontend

* HTML5
* CSS3
* JavaScript

### Controle de versão

* Git
* GitHub

## 📁 Estrutura do projeto

```text
APP_TO_DO/
│
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .env
├── .gitignore
├── app.js
├── database.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/XiloMssj/App-Lista-de-Tarefas.git
```

Entre na pasta:

```bash
cd App-Lista-de-Tarefas
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
MONGO_URI=sua_string_de_conexao
DB_NAME=List_To_Do
COLLECTION_NAME=Base_To_Do
```

> O arquivo `.env` não deve ser enviado para o GitHub.

### 4. Execute a aplicação

```bash
node app.js
```

Depois, acesse no navegador:

```text
http://localhost:3000
```

## 🗄️ Banco de dados

A aplicação utiliza o **MongoDB** para armazenar as tarefas.

A estrutura utilizada possui informações como:

* ID da tarefa
* Nome da tarefa
* Descrição
* Data de entrada
* Horário
* Prioridade
* Status de conclusão

A conexão com o banco é configurada através de variáveis de ambiente para evitar que credenciais sejam armazenadas diretamente no código.

## 🔐 Segurança

Informações sensíveis, como a string de conexão do MongoDB, são armazenadas no arquivo `.env`.

O `.gitignore` impede que o arquivo seja enviado para o repositório:

```gitignore
node_modules/
.env
```

## 🔎 Pesquisa e filtros

A aplicação permite pesquisar tarefas pelo nome e combinar a pesquisa com o filtro de prioridade.

Também é possível ordenar as tarefas por:

* Nome — A → Z
* Nome — Z → A
* Data — mais antiga
* Data — mais recente

## 🔔 Sistema de lembretes

O projeto possui um sistema de lembretes utilizando as **Notifications API** do navegador.

Quando chega o horário configurado para uma tarefa, o navegador pode apresentar uma notificação contendo informações da tarefa, como seu nome e descrição.

Para utilizar as notificações, o navegador precisa ter permissão para exibi-las.

## 📌 Próximos passos

Algumas funcionalidades que podem ser adicionadas futuramente:

* [ ] Categorias de tarefas
* [ ] Filtro por status
* [ ] Filtro por período
* [ ] Dashboard com estatísticas
* [ ] Sistema de usuários e autenticação
* [ ] Deploy da aplicação
* [ ] Responsividade para dispositivos móveis
* [ ] Notificações mais avançadas
* [ ] Página de detalhes da tarefa

## 👨‍💻 Autor

**Marcelo Souza dos Santos Junior**

Projeto desenvolvido para estudo e prática de desenvolvimento web, APIs REST, integração com banco de dados e JavaScript.
