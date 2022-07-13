//descrição básica - botão adicionar tarefa
//Recolher as informação (value) dos elementos HTML e montar um array de objetos com elas (let listaTarefas)
//Com essa lista de tarefas, montar um template HTML das atividades
//Renderizar na tela os templates montados

//Interceptando os elementos
let addBtn = document.getElementById("addBtn")
let select = document.getElementById("urgencia")
let inputText = document.getElementById("input")
let tagLista = document.getElementById("lista")

//Array de tarefas que será alimentado
let listaTarefas = [
  // {
  //   nome: "Regar as plantas",
  //   urgencia: "normal"
  // },
  // {
  //   nome: "Recolher o lixo",
  //   urgencia: "prioritario"
  // },
  // {
  //   nome: "Terminar os exercícios",
  //   urgencia: "urgente"
  // },
]

//Adicionar o escutador no botão adicionar
addBtn.addEventListener("click",adicionarTarefa)

//Montar a função adicionar tarefa
function adicionarTarefa(){
  let novaTarefa = {}  

  if(inputText.value !== "" && select.value !== ""){
    novaTarefa.nome = inputText.value
    novaTarefa.urgencia = select.value

    listaTarefas.push(novaTarefa)
  
    renderizar(ordenar(listaTarefas), tagLista)
  }
  
  inputText.value = ""
  select.value = ""

  

}

//Função que ordena por prioridade
function ordenar (lista){
  let urgente = []
  let prioritario = []
  let normal = []
  let ordenada = []
  
  for(let i=0; i<lista.length; i++){
      if(lista[i].urgencia === "urgente"){
        urgente.push(lista[i])
      } else if(lista[i].urgencia === "prioritario"){
        prioritario.push(lista[i])
      } else if(lista[i].urgencia === "normal"){
        normal.push(lista[i])
      }
    }
    ordenada = urgente.concat(prioritario).concat(normal)  
    return ordenada 
  
}

//Função que renderiza os elemenstos na tela
function renderizar (arrayTarefas, taglista){
  tagLista.innerHTML = ""

  for(let i=0; i<arrayTarefas.length; i++){
    let template = montarTemplate(arrayTarefas[i],i)
    taglista.append(template)
  }

}

//Função que cria os templates das atividades
function montarTemplate(tarefa, index){
  let li = document.createElement("li")
  li.classList.add(tarefa.urgencia)
  li.id = index
  li.innerHTML = `
  <p>${tarefa.nome}</p>
  <button id="${index}">X</button>`

  return li
}


//Função para remover a tarefa
function removerTarefa (event){

  let btn = event.target
  
  if(btn.tagName == "BUTTON"){
    // let li = btn.parentNode
    // tagLista.removeChild(li)
    // listaTarefas.splice(btn.id,1)   
    // console.log(listaTarefas)

    listaTarefas.splice(btn.id,1)
    renderizar(ordenar(listaTarefas), tagLista)
    console.log(listaTarefas)


  }
}
//Adicionando uma escuta na ul para remover tarefas
tagLista.addEventListener("click",removerTarefa)

//Capturando elementos para a pesquisa
let inputPesq = document.getElementById("pesquisa-texto")
let btnPesq = document.getElementById("pesquisa")

btnPesq.addEventListener("click",pesquisar)

function pesquisar(){
  let texto = inputPesq.value
  let normalizado = texto.toLowerCase().trim()
  let arrayPesq = normalizado.split(" ")
  let listaFiltrada = []

  for(let i=0; i<listaTarefas.length ;i++){
    let nomeTarefa = `${listaTarefas[i].nome}`.toLowerCase()    
    let arrayBusc = nomeTarefa.split(" ")    
    for(let j=0; j<arrayBusc.length; j++){
      if(arrayPesq.includes(arrayBusc[j])){
        listaFiltrada.push(listaTarefas[i])
        
      }
    }
  }
  renderizar(ordenar(listaFiltrada), tagLista)

  if(inputPesq.value === ""){
  renderizar(ordenar(listaTarefas), tagLista)
  }
  
}