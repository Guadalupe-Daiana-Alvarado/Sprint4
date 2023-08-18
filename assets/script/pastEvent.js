import {createCard, pintCard, filterCaterogory, createCheck, pintCheck} from '../module/function.js'

let text = document.getElementById("h1").textContent;
let datos; // Variable para almacenar los datos de la API
let curren 
let eventsPast
fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(response => response.json())
.then(res =>{
    datos = res.events
    curren = res.currentDate

    eventsPast = datos.filter(evento => evento.date < curren)
    //console.log(eventsPast);

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

function aplicarFiltros() { 
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
