let datos; // Variable para almacenar los datos de la API

fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then(response => response.json())
.then(data => {

datos = data
console.log(datos);

let date = datos.events
console.log(date);

const param = location.search
console.log(param);

const objUrl = new URLSearchParams (param)
console.log(objUrl);

const idEvent = objUrl.get('details')
console.log(idEvent);

const objEvent = date.find( objetEvent => objetEvent._id == idEvent)
console.log(objEvent);
const $containerDetail = document.getElementById("containerDetail")
 let cardDetail = createCard(objEvent)
 printCardDetail($containerDetail, cardDetail)

//console.log($containerDetail);

function createCard (objEvent){
    return `       
    <div id="containerDetail" class="d-flex justify-content-center align-items-center ">
    <div class="d-flex justify-content-center align-items-center w-30 col-sm-5">
      <figure class="figure">
        <div class="card-body-datails mh-100">
           <img src="${objEvent.image}" id="img-detail" class="figure-img img-fluid rounded " alt="Image-Card">
        </div>
        <div id="textCardDetail">
          <figcaption> <h2 class="card-title">${objEvent.name}</h5> </figcaption>
          <figcaption><h6 class="card-text">Category: ${objEvent.category}</h6></figcaption>
          <figcaption><h6 class="card-text">Date: ${objEvent.date}</h6></figcaption>
          <figcaption> <h6 class="card-text">${objEvent.estimate ? `Estimate: ${objEvent.estimate}` : `Capacity: ${objEvent.capacity}`}</h6></figcaption>
          <figcaption> <h5 class="card-text ">Price:${objEvent.price}</h5></figcaption>
          <figcaption>  <a href="../../index.html" class="btn btn-danger"> Back</a></figcaption>
        </div>
      </figure>
    </div>
    </div> `
}

function printCardDetail (container, card ){
    container.innerHTML = card
}

})
.catch(error => {console.log('Error al obtener los datos de la API:', error);
})