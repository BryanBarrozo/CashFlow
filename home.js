//Função de abrir e fechar o modal
const open = document.getElementById("open")
const close1 = document.getElementById("close1")
const close2 = document.getElementById("close2")

const modal = document.querySelector("dialog")
const body = document.querySelector("body");

open.onclick = abrirModal;
close1.onclick = fecharModal;
close2.onclick = fecharModal;

function abrirModal(){
    modal.showModal()
    body.classList.add("blur")
}
function fecharModal() {
    verificar_nome.style.removeProperty('box-shadow');
    verificar_valor.style.removeProperty('border-bottom');
    verificar_data.style.removeProperty('box-shadow');
    verificar_select.style.removeProperty('box-shadow');


    document.getElementById("form").reset();
    change_entrada();
    modal.close();
    body.classList.remove("blur");
}


//verificando se foram colocados valores no form
function verificar(nome, valor, data, categoria){
    let valido = true

    if(!nome){
        verificar_nome.style.boxShadow = "0 0 3px 0 #f43f5e"
        valido = false
    }else{
        verificar_nome.style.boxShadow = "0 0 3px 0 #10b981"
    }

    if(!valor){
        verificar_valor.style.borderBottom = "1px solid #f43f5e"
        valido = false
    }else{
        verificar_valor.style.borderBottom = "1px solid #10b981"
    }

    if(!data){
        verificar_data.style.boxShadow = "0 0 3px 0 #f43f5e"
        valido = false
    }else{
        verificar_data.style.boxShadow = "0 0 3px 0 #10b981"
    }

    if(!categoria){
        verificar_select.style.boxShadow = "0 0 3px 0 #f43f5e"
        valido = false
    }else{
        verificar_select.style.boxShadow = "0 0 3px 0 #10b981"
    }

    return valido;
}
//functions tabela
function add_tabela(nome, valor, data, tipo, categoria){

    let lista_tabela = document.getElementById("lista_tabela");

    let linha = document.createElement("tr");

    let td_nome = document.createElement("td");
    let td_data = document.createElement("td");
    let td_categoria = document.createElement("td");
    let td_valor = document.createElement("td");
    

    td_nome.textContent = nome;
    const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
    td_data.textContent = dataFormatada;
    td_categoria.textContent = categoria;
    td_valor.textContent = parseFloat(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
    });

    linha.appendChild(td_nome);
    linha.appendChild(td_data);
    linha.appendChild(td_categoria);
    linha.appendChild(td_valor);
    
    if(tipo == "entrada"){
        td_valor.style.color = "#10b981"
    }else{
        td_valor.style.color = "#f43f5e"
    }

    lista_tabela.appendChild(linha);
}

//Função calculo 
let saldo_total = 0;
let saldo_entrada = 0;
let saldo_saida = 0;
let formatando = '';

let card_saldo = document.getElementById('card_saldo');
let card_entrada = document.getElementById('card_entrada');
let card_saida = document.getElementById('card_saida');

function calculo(valor, tipo){
    let x = parseFloat(valor);
    if(tipo == "entrada"){
        saldo_entrada += x;
        saldo_total += x;

        formatando = saldo_total.toLocaleString('pt-BR',{style:'currency', currency:'BRL'});
        card_saldo.textContent = formatando;

        formatando = saldo_entrada.toLocaleString('pt-BR',{style:'currency', currency:'BRL'});
        card_entrada.textContent = formatando;
    }
    else{
        saldo_saida += x;
        saldo_total -= x;

        formatando = saldo_total.toLocaleString('pt-BR',{style:'currency', currency:'BRL'});
        card_saldo.textContent = formatando;

        formatando = saldo_saida.toLocaleString('pt-BR',{style:'currency', currency:'BRL'});
        card_saida.textContent = formatando;
    }

}


//Grafico
let Salario = 0;
let Mercado = 0;
let Aluguel = 0;
let Lazer = 0;
let Outros = 0;

const ctx = document.getElementById('grafico');

const grafico = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Salario', 'Mercado','Aluguel','Lazer','Outros'],
        datasets: [{
            label: 'Resumo financeiro',
            data: [Salario, Mercado, Aluguel, Lazer, Outros],
            
        }]
    },
    options: {
        responsive: true

    }
});

const total = Salario + Mercado + Aluguel + Lazer + Outros;



//Esilizar o grafico
grafico.options.plugins.tooltip = {
    backgroundColor: "#1e293b",
    titleColor: "#fff",
    bodyColor: "#cbd5f5",
    borderColor: "#3b82f6",
    borderWidth: 1
};
grafico.options.plugins.legend.labels = {
    color: "#b4bad0",
    
    font:{
        size: 13,
        weight: "bold",
    }
}
grafico.data.datasets[0] = {
    data: [Salario, Mercado, Aluguel, Lazer, Outros],

    backgroundColor: [
        "#10b981", 
        "#3b82f6",
        "#6366f1",
        "#f43f5e",
        "#94a3b8"  
    ],

    borderWidth: 0,
};

function calculo_grafico(categoria, valor){
    let x = parseFloat(valor);
    if(categoria == 'Salario'){
        Salario += x;
    } else if(categoria == 'Mercado'){
        Mercado += x;
    } else if(categoria == 'Aluguel'){
        Aluguel += x;
    } else if(categoria == 'Lazer'){
        Lazer += x;
    } else if(categoria == 'Outros'){
        Outros += x;
    }

    grafico.data.datasets[0].data = [Salario, Mercado, Aluguel, Lazer, Outros];
    grafico.update();
}

//FUNÇÃO SELECT OPÇÕES


const entrada_select = document.getElementById("entrada");
const entrada_option = document.querySelectorAll('.entrada_option');
const saida_select = document.getElementById("saida");
const saida_option = document.querySelectorAll(".saida_option")


entrada_select.addEventListener('change', change_entrada);
   
function change_entrada(){
    document.getElementById("categoria").value = "";//limpando a categoria
    for(let i = 0; i < entrada_option.length; i++){
        entrada_option[i].classList.remove("hide");
    }
    for(let i = 0; i < saida_option.length; i++){
        saida_option[i].classList.add("hide");
    }
}
//Apenas change_entrada tem função com nome para eu poder chamar ela no fechar modal e resetar o select

saida_select.addEventListener('change', () => {
    document.getElementById("categoria").value = "";
    for(let i = 0; i < entrada_option.length; i++){
        entrada_option[i].classList.add("hide");
    }
    for(let i = 0; i < saida_option.length; i++){
        saida_option[i].classList.remove("hide");
    }
});




//FUNÇÃO SUBMIT
const submit = document.getElementById("submit")

let verificar_nome = document.getElementById("verificar_nome");
let verificar_valor = document.getElementById("verificar_valor");
let verificar_data = document.getElementById("verificar_data");
let verificar_select = document.getElementById("verificar_select");

submit.onclick = function(e){
    e.preventDefault();

    let nome = document.getElementById("input_nome").value;
    let valor = document.getElementById("input_valor").value;
    let data = document.getElementById("input_data").value;
    let tipo = document.querySelector('input[name="tipo"]:checked').value;
    let categoria = document.getElementById('categoria').value;

    console.log(categoria)
    let valido = verificar(nome, valor, data, categoria);//verificando inputs
    if(!valido){
        console.log("click return");
        return;
    }

    //Calculo dos valores e implementação nos cards
    calculo(valor, tipo);
    
    //Atualiza o grafico
    calculo_grafico(categoria, valor);

    //Add na tabela
    add_tabela(nome, valor, data, tipo, categoria);
    // fechar modal depois de adicionar
    fecharModal();
};