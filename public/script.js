const form = document.getElementById("formTarefa");

const containerPendentes = document.getElementById("tarefasPendentes");

const containerConcluidas = document.getElementById("tarefasConcluidas");

const contadorPendentes = document.getElementById("contadorPendentes");

const contadorConcluidas = document.getElementById("contadorConcluidas");

const contador = document.getElementById("contador");

let tarefaEditando = null

let tarefaParaExcluir = null;

const modalExcluir = document.getElementById("modalExcluir");

const btnCancelarExclusao = document.getElementById("btnCancelarExclusao");

const btnConfirmarExclusao = document.getElementById("btnConfirmarExclusao");

function preencherDataAtual() {

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    document.getElementById("data").value =
        `${ano}-${mes}-${dia}`;
}

preencherDataAtual();

async function listarTarefas() {

    try {

        const resposta = await fetch("/tarefas");

        const tarefas = await resposta.json();

        // Pega o filtro selecionado no HTML
        const filtro = document.getElementById("filtroPrioridade").value;

        const pesquisa =
            document
                .getElementById("pesquisaTarefa")
                .value
                .toLowerCase();

        const ordenacao = document.getElementById("ordenacao").value;
                
        const tarefasFiltradas = tarefas.filter(tarefa => {

        // Filtro de prioridade
        const correspondePrioridade =
            filtro === "todas" ||
            tarefa.Prioridade === filtro;


        // Filtro de pesquisa
        const correspondePesquisa =
            tarefa.Nome_tarefa
                .toLowerCase()
                .includes(pesquisa);


        // Precisa passar pelos dois filtros
        return (
            correspondePrioridade &&
            correspondePesquisa
        );

    });

        tarefasFiltradas.sort((a, b) => {

        if (ordenacao === "nome_asc") {

            return a.Nome_tarefa.localeCompare(
                b.Nome_tarefa
            );

        }

        if (ordenacao === "nome_desc") {

            return b.Nome_tarefa.localeCompare(
                a.Nome_tarefa
            );

        }

        if (ordenacao === "data_asc") {

            return new Date(a.Data_entrada) -
                new Date(b.Data_entrada);

        }

        if (ordenacao === "data_desc") {

            return new Date(b.Data_entrada) -
                new Date(a.Data_entrada);

        }

        return 0;

    });

        // Limpa os dois quadros
        containerPendentes.innerHTML = "";

        containerConcluidas.innerHTML = "";

        // Separa as tarefas PENDENTES
        // usando as tarefas que passaram pelo filtro
        const pendentes = tarefasFiltradas.filter(
            tarefa => tarefa.Finalizada === false
        );

        // Separa as tarefas CONCLUÍDAS
        // usando as tarefas que passaram pelo filtro
        const concluidas = tarefasFiltradas.filter(
            tarefa => tarefa.Finalizada === true
        );

        // Atualiza os contadores
        contadorPendentes.textContent =
            `${pendentes.length} tarefas`;

        contadorConcluidas.textContent =
            `${concluidas.length} tarefas`;

        // Mostra tarefas pendentes
        pendentes.forEach(tarefa => {

            criarCardTarefa(
                tarefa,
                containerPendentes
            );

        });

        // Mostra tarefas concluídas
        concluidas.forEach(tarefa => {

            criarCardTarefa(
                tarefa,
                containerConcluidas
            );

        });

    } catch (erro) {

        console.error(
            "Erro ao listar tarefas:",
            erro
        );

    }

}

document
    .getElementById("filtroPrioridade")
    .addEventListener("change", () => {

        listarTarefas();

    });

document
    .getElementById("pesquisaTarefa")
    .addEventListener("input", () => {

        listarTarefas();

    });

document
    .getElementById("ordenacao")
    .addEventListener("change", () => {

        listarTarefas();

    });

// ==========================================
// CADASTRAR TAREFA
// ==========================================

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    const descricao = document.getElementById("descricao").value;

    const data = document.getElementById("data").value;

    const hora = document.getElementById("hora").value;

    const prioridade = document.getElementById("prioridade").value;

    const dados = {

        Nome_tarefa: nome,

        Descricao: descricao,

        Data_entrada: data,

        Hora_inicio: hora,

        Prioridade: prioridade

    };


    try {

        // =========================
        // EDITAR
        // =========================

        if (tarefaEditando) {

            await fetch(`/tarefas/${tarefaEditando}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(dados)

            });

            // Sai do modo edição
            tarefaEditando = null;


        }

        // =========================
        // CRIAR
        // =========================

        else {

            await fetch("/tarefas", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    Nome_tarefa: nome,
                    
                    Descricao: descricao,

                    Data_entrada: data,

                    Finalizada: false,

                    Hora_inicio: hora,

                    Prioridade: prioridade

                })

            });

        }

        // Limpa formulário
        form.reset();
        preencherDataAtual();

        // Volta o botão para o estado normal
        form.querySelector("button").textContent =
            "Adicionar tarefa";

        // Atualiza lista
        listarTarefas();

    } catch (erro) {

        console.error("Erro ao salvar tarefa:", erro);

    }

});

// ==========================================
// EXCLUIR TAREFA
// ==========================================

async function excluirTarefa(id) {
    
    tarefaParaExcluir = id;

    document.getElementById("modalExcluir").style.display = "flex";

}

document
    .getElementById("btnCancelarExclusao")
    .addEventListener("click", () => {

        tarefaParaExcluir = null;

        document.getElementById("modalExcluir").style.display = "none";

    });

// ==========================================
// CONCLUIR TAREFA
// ==========================================
async function alternarConclusao(id, Finalizada) {

    try {

        await fetch(`/tarefas/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                Finalizada: !Finalizada
            })

        });

        listarTarefas();

    } catch (erro) {

        console.error("Erro ao concluir tarefa:", erro);

    }

}

// ==========================================
// CONCLUIR TAREFA
// ==========================================
async function editarTarefa(id) {

    try {

        // Busca todas as tarefas
        const resposta = await fetch("/tarefas");

        const tarefas = await resposta.json();

        // Procura a tarefa que queremos editar
        const tarefa = tarefas.find(
            tarefa => tarefa._id === id
        );

        if (!tarefa) {
            alert("Tarefa não encontrada");
            return;
        }


        // Coloca os dados da tarefa no formulário
        document.getElementById("nome").value = tarefa.Nome_tarefa;

        document.getElementById("descricao").value = tarefa.Descricao;

        document.getElementById("data").value = tarefa.Data_entrada;

        document.getElementById("hora").value = tarefa.Hora_inicio;

        // Guarda o ID da tarefa
        tarefaEditando = id;

        // Muda o texto do botão
        form.querySelector("button").textContent =
            "Salvar alterações";

    } catch (erro) {

        console.error("Erro ao buscar tarefa:", erro);

    }

}

// ==========================================
// CRIAR CARD TAREFAS
// ==========================================


function criarCardTarefa(tarefa, container) {

    let classePrioridade = "";

    let textoPrioridade = "";

    if (tarefa.Prioridade === "alta") {

        classePrioridade = "prioridade-alta";
        textoPrioridade = "🔴 ALTA";

    } else if (tarefa.Prioridade === "media") {

        classePrioridade = "prioridade-media";
        textoPrioridade = "🟡 MÉDIA";

    } else {

        classePrioridade = "prioridade-baixa";
        textoPrioridade = "🟢 BAIXA";

    }

    const elemento = document.createElement("div");

    elemento.classList.add("tarefa");

    elemento.innerHTML = `
        <div class="prioridade ${classePrioridade}">
            ${textoPrioridade}
        </div>

        <h3>
            ${tarefa.Nome_tarefa}
        </h3>

        <p>
            ${tarefa.Descricao}
        </p>

        <p>
            Data: ${tarefa.Data_entrada}
        </p>

        <p>
            Hora de inicio: ${tarefa.Hora_inicio}
        </p>

        <p>
            Status:
            ${tarefa.Finalizada
                ? "Concluída"
                : "Pendente"}
        </p>


        <div class="acoes">

            <button
                class="btn-editar"
                onclick="editarTarefa('${tarefa._id}')">

                ✏️ Editar

            </button>


            <button
                class="btn-concluir"
                onclick="alternarConclusao(
                    '${tarefa._id}',
                    ${tarefa.Finalizada}
                )">

                ${tarefa.Finalizada
                    ? "↩️ Reabrir"
                    : "✅ Concluir"}

            </button>


            <button
                class="btn-excluir"
                onclick="excluirTarefa('${tarefa._id}')">

                🗑️ Excluir

            </button>

        </div>

    `;


    container.appendChild(elemento);

}

document
    .getElementById("btnCancelarExclusao")
    .addEventListener("click", () => {

        tarefaParaExcluir = null;

        document.getElementById("modalExcluir").style.display = "none";

    });

// CONFIRMAR EXCLUSÃO
document
    .getElementById("btnConfirmarExclusao")
    .addEventListener("click", async () => {

        if (!tarefaParaExcluir) {
            return;
        }

        try {

            await fetch(`/tarefas/${tarefaParaExcluir}`, {
                method: "DELETE"
            });

            tarefaParaExcluir = null;

            document.getElementById("modalExcluir").style.display = "none";

            listarTarefas();

        } catch (erro) {

            console.error(
                "Erro ao excluir tarefa:",
                erro
            );

        }

    });

if ("Notification" in window) {

    Notification.requestPermission();

}

async function verificarLembretes() {

    try {

        const resposta = await fetch("/tarefas");

        const tarefas = await resposta.json();

        const agora = new Date();

        const dataAtual =
            agora.toISOString().split("T")[0];

        const horaAtual =
            agora.toTimeString().slice(0, 5);

        tarefasFiltradas.forEach(tarefa => {

            // Ignora tarefas concluídas
            if (tarefa.Concluida === true) {
                return;
            }

            // Verifica se é a data e hora da tarefa
            if (
                tarefa.Data_entrada === dataAtual &&
                tarefa.Hora_inicio === horaAtual
            ) {

                new Notification("🔔 Hora da tarefa!", {

                    body: `${tarefa.Nome_tarefa}\n\n${tarefa.Descricao}`
                    

                });

            }

        });

    } catch (erro) {

        console.error(
            "Erro ao verificar lembretes:",
            erro
        );

    }

}

setInterval(verificarLembretes, 60000);

// ==========================================
// INICIAR
// ==========================================

// Quando abrir o site,
// busca as tarefas no MongoDB.

listarTarefas();




