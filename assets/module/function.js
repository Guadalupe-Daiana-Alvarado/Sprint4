let text = document.getElementById("h1").textContent;


export function createCard(evento, text) {
  if (text === "Home") {
    return ` 
      <div class="card " style="width: 18rem;">
        <img src="${evento.image}" class="card-img-top" alt="Image-card">
        <div class="card-body">
          <h3>${evento.name}</h3>
          <p>${evento.description}</p>
        </div>
        <div class="d-flex justify-content-around align-items-center pb-3">
          <h4>Price: $${evento.price}</h4>
          <a href="./assets/page/details.html?details=${evento._id}"" class="btn btn-danger">Details</a>
        </div>
      </div>`;
  } else {
    return ` 
      <div class="card" style="width: 18rem;">
        <img src="${evento.image}" class="card-img-top" alt="Image-card">
        <div class="card-body">
          <h3>${evento.name}</h3>
          <p>${evento.description}</p>
        </div>
        <div class="d-flex justify-content-around align-items-center pb-3">
          <h4>Price: $${evento.price}</h4>
          <a href="../page/details.html?details=${evento._id}" class="btn btn-danger">Details</a>
        </div>
      </div>`;
  }
}

export function pintCard(datos, container) {
    for (const dato of datos) {
    let template = createCard(dato, text);
    container.innerHTML += template;
    }}

export function filterCaterogory (datos){
    let categoryRepeated =[]
    for (const event of datos) {
  
        categoryRepeated.push(event.category)
    }
  return categoryRepeated
  }

  export function createCheck (category){
    return `<div class="form-check pe-3">
    <input  class="form-check-input" type="checkbox" value="${category}" name="${category}" id="${category}">
    <label class="form-check-label" for="${category}">${category}</label> 
    </div> `
  }

  export function pintCheck (category, container){
    for (const dato of category) {
      let templete = createCheck(dato)
      container.innerHTML += templete
      
    }}

