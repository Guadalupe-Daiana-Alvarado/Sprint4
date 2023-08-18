import {createCard, pintCard, filterCaterogory, createCheck, pintCheck} from '../module/function.js'

let datos; // Variable para almacenar los datos de la API
let text = document.getElementById("h1").textContent;
let curren 
let eventsPast
fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then(res =>{
    datos = res.events
    curren = res.currentDate
    console.log(curren);
    console.log(datos);
    eventsPast = datos.filter(evento => evento.date < curren)
    console.log(eventsPast);
    pintCard(eventsPast, $containerCardPast)
    let categoryRepeated = filterCaterogory(datos)
    const categorySinRepeating = [... new Set(categoryRepeated)];
    pintCheck( categorySinRepeating, $containerCheck);
}). catch(err=> console.log(err))

let $containerCardPast = document.getElementById("containerCardPast")
let $containerCheck = document.getElementById("div-check") 


//------------------------------//ESCUCHANDO//------------------------------//
let $check = document.getElementById("div-check") //ESCUCHANDO CHECK
$check.addEventListener  ('change', ( ) => {
  aplicarFiltros ()
})

const $search = document.getElementById ('search') //ESCUCHANDO SERCH
//console.log($search);
$search.addEventListener ('input', () => {
  aplicarFiltros ()
})

//------------------------------//FILTRANDO//------------------------------//

function filtrarEventosPorCat(datos, category) {  //FILTRO POR CHECK/CATEGOTY
  if (category.length === 0) {
    return datos;
  } else {
    return datos.filter(evento => category.includes(evento.category));
  }
}

function filtroCruzadoSearchYCategory(eventsPast, busqueda, categorias) {  //CRUZADOS
  let filtradosPorNombre = eventsPast.filter(evento => evento.name.toLowerCase().includes(busqueda.toLowerCase()));
  return filtrarEventosPorCat(filtradosPorNombre, categorias);
}

function aplicarFiltros() { //
  const categoriasSeleccionadas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value);
  const busqueda = $search.value;
  
  let eventosFiltrados = [];

  if (!busqueda && categoriasSeleccionadas.length === 0) {
    eventosFiltrados = eventsPast; // Sin filtros, mostrar todos los eventos
  } else {
    eventosFiltrados = filtroCruzadoSearchYCategory(eventsPast, busqueda, categoriasSeleccionadas);
  }
  actualizandoCondicion(eventosFiltrados);
}

  function actualizandoCondicion(eventosFiltrados) {
  if (eventosFiltrados.length === 0) {
    $containerCardPast.innerHTML = `<img style="width: 45vh;" src="../image/Ops.png" alt="Error">`;
  } else {
    $containerCardPast.innerHTML = eventosFiltrados.map(evento => createCard(evento));
  }
}



//------------------------------//FILTRANDO LAS CARDS PASADAS//------------------------------//

//console.log(eventsPast);

//------------------------------//FILTRANDO LAS CATEGORIAS//------------------------------//

/* function filterCaterogory (dataEvents){
  let categoryRepeated =[]
  for (const event of dataEvents) {
      categoryRepeated.push(event.category)
  }
return categoryRepeated
} */

//let categoryRepeated = filterCaterogory(dataEvents)
//console.log(categoryRepeated);
//const categorySinRepeating = [... new Set(categoryRepeated)];
//console.log(categorySinRepeating);

//------------------------------//CREANDO CARDS//------------------------------//
/* function createCard (evento){
        return ` 
        <div class="card" style="width: 18rem;">
          <img src="${evento.image}" class="card-img-top" alt="Image-card">
          <div class="card-body">
            <h3>${evento.name}</h3>
            <p>${evento.description}</p>
          </div>
          <div class="d-flex justify-content-around align-items-center pb-3">
            <h4>Price: $ ${evento.price}</h4>
            <a href="../page/details.html?details=${evento._id}" class="btn btn-danger">Details</a>
          </div>
        </div>`
} */

//------------------------------//PINTANDO CARDS//------------------------------//
/* function pintCard (eventsPast, container){
  for (const dato of eventsPast) {
    let templete = createCard(dato)
    container.innerHTML += templete
  }} */
//pintCard(eventsPast, $containerCardPast)

//------------------------------//CREANDO CHECK//------------------------------//

/* function createCheck (category){
  return `<div class="form-check pe-3">
  <input class="form-check-input" type="checkbox" value="${category}" name="${category}" id="${category}">
  <label class="form-check-label" for="${category}">${category}</label>  
  </div>`
}
 */
//------------------------------//PINTANDO CHECK//------------------------------//
/* function pintCheck (category, container){
  for (const dato of category) {
    let templete = createCheck(dato)
    container.innerHTML += templete
   }} */
//pintCheck( categorySinRepeating, $containerCheck)
