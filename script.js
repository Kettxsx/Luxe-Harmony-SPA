// ===============================
// VARIÁVEIS DO AGENDAMENTO
// ===============================

let servicoAtual = "";
let valorAtual = 0;


// ===============================
// ABRIR MODAL DE AGENDAMENTO
// ===============================

function abrirModal(servico, valor) {

    servicoAtual = servico;
    valorAtual = Number(valor) || 0;

    document.getElementById("modal").style.display = "flex";

    // Nome do serviço
    document.getElementById("servicoEscolhido").innerHTML =
        servico;

    // Valor total
    document.getElementById("valorTotal").innerHTML =
        "Valor total: R$ " +
        valorAtual.toFixed(2).replace(".", ",");

    // Sinal de 30%
    let sinal = valorAtual * 0.30;

    // Restante
    let restante = valorAtual - sinal;

    document.getElementById("sinal").innerHTML =
        "Sinal de 30%: R$ " +
        sinal.toFixed(2).replace(".", ",");

    document.getElementById("restante").innerHTML =
        "Restante no dia: R$ " +
        restante.toFixed(2).replace(".", ",");


    // Limpa a data escolhida anteriormente
    const data = document.getElementById("dataAgendamento");

    if (data) {
        data.value = "";
        definirDataMinima();
    }


    // Limpa os horários
    const horario =
        document.getElementById("horarioAgendamento");

    if (horario) {

        horario.innerHTML =
            '<option value="">Escolha uma data primeiro</option>';

    }


    // Limpa forma de pagamento
    const pagamento =
        document.getElementById("formaPagamento");

    if (pagamento) {
        pagamento.value = "";
    }

}


// ===============================
// FECHAR MODAL
// ===============================

function fecharModal() {

    document.getElementById("modal").style.display = "none";

}


// ===============================
// CALCULAR COMBO
// ===============================

function calcularCombo() {

    let total = 0;

    let checks =
        document.querySelectorAll(
            '.checkboxes input:checked'
        );

    checks.forEach(function(item) {

        total += Number(item.value);

    });

    document.getElementById("total").innerHTML =
        total.toFixed(2);

}


// ===============================
// ABRIR COMBO PERSONALIZADO
// ===============================

function abrirCombo() {

    let total =
        Number(
            document.getElementById("total").innerHTML
        );

    if (total <= 0) {

        alert("Escolha algum serviço.");

        return;
    }

    abrirModal("Combo Personalizável", total);

}


// ===============================
// HORÁRIOS DISPONÍVEIS
// ===============================

const horariosDisponiveis = [

    "09:00",
    "10:00",
    "11:00",

    "13:00",
    "14:00",
    "15:00",

    "16:00",
    "17:00"

];


// ===============================
// DATA MÍNIMA
// ===============================

function definirDataMinima() {

    const data =
        document.getElementById("dataAgendamento");

    if (!data) {
        return;
    }

    const hoje = new Date();

    const ano =
        hoje.getFullYear();

    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            hoje.getDate()
        ).padStart(2, "0");

    data.min =
        ano + "-" + mes + "-" + dia;

}


// ===============================
// MOSTRAR HORÁRIOS
// ===============================

function carregarHorarios() {

    const data =
        document.getElementById("dataAgendamento");

    const horario =
        document.getElementById("horarioAgendamento");


    if (!data || !horario) {
        return;
    }


    // Se não tiver data
    if (data.value === "") {

        horario.innerHTML =
            '<option value="">Escolha uma data primeiro</option>';

        return;
    }


    // Limpa os horários antigos
    horario.innerHTML =
        '<option value="">Selecione um horário</option>';


    // Adiciona os horários
    horariosDisponiveis.forEach(function(hora) {

        const opcao =
            document.createElement("option");

        opcao.value = hora;

        opcao.textContent = hora;

        horario.appendChild(opcao);

    });

}


// ===============================
// FINALIZAR AGENDAMENTO
// ===============================

function finalizarAgendamento() {

    const data =
        document.getElementById("dataAgendamento").value;

    const horario =
        document.getElementById("horarioAgendamento").value;

    const pagamento =
        document.getElementById("formaPagamento").value;


    // Verifica data
    if (data === "") {

        alert("Escolha uma data.");

        return;
    }


    // Verifica horário
    if (horario === "") {

        alert("Escolha um horário.");

        return;
    }


    // Verifica pagamento
    if (pagamento === "") {

        alert("Escolha uma forma de pagamento.");

        return;
    }


    // Converte a data para ficar mais bonita
    const partesData =
        data.split("-");

    const dataFormatada =
        partesData[2] +
        "/" +
        partesData[1] +
        "/" +
        partesData[0];


    // Mensagem final
    alert(
        "Agendamento realizado com sucesso!\n\n" +

        "Serviço: " +
        servicoAtual +
        "\n" +

        "Data: " +
        dataFormatada +
        "\n" +

        "Horário: " +
        horario +
        "\n" +

        "Valor: R$ " +
        valorAtual.toFixed(2).replace(".", ",") +
        "\n" +

        "Pagamento: " +
        pagamento
    );


    // Fecha o modal
    fecharModal();

}


// ===============================
// QUANDO A PÁGINA CARREGAR
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const data =
            document.getElementById(
                "dataAgendamento"
            );


        if (data) {

            // Define a data mínima
            definirDataMinima();


            // Quando a data mudar,
            // aparecem os horários
            data.addEventListener(
                "change",
                carregarHorarios
            );

        }

    }
);
