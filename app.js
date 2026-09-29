import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const app = express();

app.use(express.json());

app.use(express.static("public"));

const client = new MongoClient(
    process.env.MONGO_URI
);

const db = client.db(process.env.DB_NAME);
const tarefas = db.collection(process.env.COLLECTION_NAME);

// Cadastro de tarefas
app.post("/tarefas", async (req, res) => {

    try {
        const {
            Nome_tarefa,
            Descricao,
            Data_entrada,
            Hora_inicio,
            Prioridade,
            Finalizada
        } = req.body;

        /*const novaTarefa = req.body;*/

        const novaTarefa = {
            Nome_tarefa,
            Descricao,
            Data_entrada,
            Hora_inicio,
            Prioridade,
            Finalizada
        };

        const resultado = await tarefas.insertOne(novaTarefa);
        
        res.status(201).json({
            Mensagem: "Tarefa cadastrada"
        });

    } catch (erro) {

        res.status(500).json({
            erro: "Erro ao cadastrar tarefa"
        });

    }

});

//listar tarefas
app.get("/tarefas", async (req, res) => {

    try {

        const resultado = await tarefas.find().toArray();

        res.json(resultado);

    } catch (erro) {

        res.status(500).json({
            erro: "Erro ao listar tarefas"
        });

    }

});

//Editar tarefas
app.put("/tarefas/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const dadosAtualizados = req.body;

        const resultado = await tarefas.updateOne(
            {
                _id: new ObjectId(id)
            },
            {
                $set: dadosAtualizados
            }
        );

        res.json(resultado);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro ao atualizar tarefa"
        });

    }

});

//Excluir tarefa
app.delete("/tarefas/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const resultado = await tarefas.deleteOne({
            _id: new ObjectId(id)
        });

        res.json({
            Mensagem: "Tarefa excluida com sucesso"
        });

    } catch (erro) {

        res.status(500).json({
            erro: "Erro ao excluir tarefa"
        });

    }

});

app.listen(3000, () => {
    console.log("API rodando na porta 3000");
});