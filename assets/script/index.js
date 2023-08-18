
import {createCard, pintCard, filterCaterogory, createCheck, pintCheck} from '../module/function.js'

let datos; // Variable para almacenar los datos de la API
let text = document.getElementById("h1").textContent;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then(res =>{
    datos = res.events
    console.log(datos);
    pintCard(datos, $containerCard)
    let categoryRepeated = filterCaterogory(datos)
    const categorySinRepeating = [... new Set(categoryRepeated)];
    pintCheck( categorySinRepeating, $containerCheck);
}). catch(err=> console.log(err))

let $containerCard = document.getElementById("containerCard")
let $containerCheck = document.getElementById("div-check")
//console.log($containerCard);
//console.log(data);
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
  
  function filtroCruzadoSearchYCategory(datos, busqueda, categorias) {  //CRUZADOS
    let filtradosPorNombre = datos.filter(evento => evento.name.toLowerCase().includes(busqueda.toLowerCase()));
    return filtrarEventosPorCat(filtradosPorNombre, categorias);
  }
  
  function aplicarFiltros() { //
    const categoriasSeleccionadas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value);
    const busqueda = $search.value;
    
    let eventosFiltrados = [];
  
    if (!busqueda && categoriasSeleccionadas.length === 0) {
      eventosFiltrados = datos; // Sin filtros, mostrar todos los eventos
    } else {
      eventosFiltrados = filtroCruzadoSearchYCategory(datos, busqueda, categoriasSeleccionadas);
    }
    actualizandoCondicion(eventosFiltrados);
  }

    function actualizandoCondicion(eventosFiltrados) {
    if (eventosFiltrados.length === 0) {
      $containerCard.innerHTML = `<img style="width: 45vh;" src="./assets/image/Ops.png" alt="Error">`;
    } else {
      $containerCard.innerHTML = eventosFiltrados.map(evento => createCard(evento));
    }
  }
  
  

//------------------------------//CREANDO CARDS//------------------------------//
/* function createCard (evento){
        return ` 
        <div class="card " style="width: 18rem;">
          <img src="${evento.image}" class="card-img-top  " alt="Image-card">
          <div class="card-body">
            <h3>${evento.name}</h3>
            <p>${evento.description}</p>
          </div>
          <div class="d-flex justify-content-around align-items-center pb-3">
            <h4>Price: $${evento.price}</h4>
            <a href="./assets/page/details.html?details=${evento._id}"" class="btn btn-danger">Details</a>
          </div>
        </div>`
}
 */
//------------------------------//PINTANDO CARDS//------------------------------//

/* function pintCard(datos, container) {
    for (const dato of datos) {
    let  template = createCard(dato);
    container.innerHTML += template;
    }}
     */
//pintCard(datos, $containerCard)

//------------------------------//FILTRANDO LAS CATEGORIAS//------------------------------//


/* function filterCaterogory (datos){
  let categoryRepeated =[]
  for (const event of datos) {

      categoryRepeated.push(event.category)
  }
return categoryRepeated
} */
//let categoryRepeated = filterCaterogory(datos)
//console.log(categoryRepeated);
//const categorySinRepeating = [... new Set(categoryRepeated)];
//console.log(categorySinRepeating);

//------------------------------//CREANDO CHECK//------------------------------//
/* function createCheck (category){
  return `<div class="form-check pe-3">
  <input  class="form-check-input" type="checkbox" value="${category}" name="${category}" id="${category}">
  <label class="form-check-label" for="${category}">${category}</label> 
  </div> `
}
 */
//------------------------------//PINTANDO CHECK//------------------------------//
/* function pintCheck (category, container){
  for (const dato of category) {
    let templete = createCheck(dato)
    container.innerHTML += templete
    
  }} */
//pintCheck( categorySinRepeating, $containerCheck);











/* /* function filtrarEventos(datos, category) { // FILTRO CHECK
  if (category.length === 0) {
    return datos;
  }else
  return datos.filter(evento => category.includes(evento.category));
}

function filtrarPorNombre (datos, busqueda){ //FILTRO SERCH
   let filtradaxNombre = datos.filter( evento => evento.name.toLowerCase().includes(busqueda.toLowerCase()))
   console.log(filtradaxNombre);
   return filtradaxNombre
}

function dobleFiltro() { //FILTRO DOBLE
  const categoriasSeleccionadas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value);
  let filtrarPorBusqueda = filtrarPorNombre(datos, $search.value);
  
  if (datos.length === 0) {
    $containerCard.innerHTML = ""; // Limpiar los resultados anteriores
    $containerCard.innerHTML = `<img style="width: 45vh;" src="./assets/image/Ops.png" alt="Error">`;
    //console.log($containerCard);
  } else if ($search.value && filtrarPorBusqueda.length === 0) {
    $containerCard.innerHTML = ""; // Limpiar los resultados anteriores
    $containerCard.innerHTML =  `<img  style="width: 45vh;"  src="./assets/image/Ops.png" alt="Error">`;
    //console.log($containerCard);
  } else {
    let filtrarCheck = filtrarEventos(filtrarPorBusqueda, categoriasSeleccionadas);
    $containerCard.innerHTML = filtrarCheck.map(evento => createCard(evento));
  }}
 */
 