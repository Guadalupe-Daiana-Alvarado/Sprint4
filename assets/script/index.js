
import { createCard, pintCard, filterCaterogory, createCheck, pintCheck } from '../module/function.js'

let datos; // Variable para almacenar los datos de la API
let text = document.getElementById("h1").textContent;

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(response => response.json())
  .then(res => {
    datos = res.events
    //console.log(datos);

    pintCard(datos, $containerCard)

    let categoryRepeated = filterCaterogory(datos)
    const categorySinRepeating = [... new Set(categoryRepeated)];
    pintCheck(categorySinRepeating, $containerCheck);

  }).catch(err => console.log(err))

let $containerCard = document.getElementById("containerCard")
let $containerCheck = document.getElementById("div-check")

//------------------------------//ESCUCHANDO//------------------------------//
let $check = document.getElementById("div-check") //ESCUCHANDO CHECK
$check.addEventListener('change', () => {
  aplicarFiltros()
})

const $search = document.getElementById('search') //ESCUCHANDO SERCH
//console.log($search);
$search.addEventListener('input', () => {
  aplicarFiltros()
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

function aplicarFiltros() { 
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
