
let datos; // Variable para almacenar los datos de la API

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(response => response.json())
    .then(res => {
        datos = res.events
        console.log(datos);
        let curren = res.currentDate

        //-------------PAST EVENT-----------------//
        let eventsPast = datos.filter(evento => evento.date <= curren) //EVENTOS PASADOS
        const pastCategorias = Array.from(new Set(datos.map((evento) => evento.category)));
        console.log(pastCategorias);
        const eventosPorCat = calcularEventosPorCategoria(eventsPast, pastCategorias);
        console.log(eventosPorCat);


        const resultados = pastCategorias.map((categoria, index) => {
            const totalIngresosPast = calcularTotalIngresos(eventosPorCat[index]);
            const totalAsistenciaPast = calcularTotalAsistencia(eventosPorCat[index]);
            console.log(totalAsistenciaPast);
            console.log(totalIngresosPast);

            return {
                categoria: categoria,
                revenues: totalIngresosPast,
                totalAsistencia: totalAsistenciaPast
            };
        });

        console.log(resultados);
        let $segundaTabla = document.getElementById('segundaTabla')
        printTabla(resultados, $segundaTabla)

        //---------------UP COMING------------------//
        let eventsUp = datos.filter(evento => evento.date >= curren && evento.category !== "Cinema");//EVENTOS FUTUROS
        console.log(eventsUp);
        const upCategories = Array.from(new Set(eventsUp.map((evento) => evento.category)));
        console.log(upCategories);
        const eventosPorCatUp = calcularEventosPorCategoria(eventsUp, upCategories);

        const resultadosUp = upCategories.map((categoria, index) => {
            const totalIngresosUp = calcularTotalEstimadoIngresos(eventosPorCatUp[index]);
            const totalAsistenciaUp = calcularEstimadoTotalAsistencia(eventosPorCatUp[index]);

            return {
                categoria: categoria,
                revenues: totalIngresosUp,
                totalAsistencia: totalAsistenciaUp
            };
        });

        let $terceraTabla = document.getElementById('terceraTabla')
        printTabla(resultadosUp, $terceraTabla)


        //---------------CATEGORIAS---------------//
        let categoryRepeated = filterCaterogory(datos)
        const categorySinRepeating = [... new Set(categoryRepeated)];
        //console.log(categorySinRepeating);


        //---------------PORCENTAJES---------------//
        let eventoMayor = eventoMayorPorcentajeAsistencia(eventsPast)
        //console.log(eventoMayor);
        let $primerRdo = document.getElementById('primerRdo')
        let eventoMayorPorc = eventoMayor.shift()
        crearTd(eventoMayorPorc, $primerRdo)
        //console.log(eventoMayorPorc);

        let $segundoRdo = document.getElementById('segundoRdo')
        let eventoMenorPorc = eventoMayor.pop()
        //console.log(eventoMenorPorc);
        crearTd(eventoMenorPorc, $segundoRdo)

        let $tercerRdo = document.getElementById('tercerRdo')
        let eventoMayorCap = mayorCapacidad(datos)
        //console.log(eventoMayorCap);
        let eventoCapidadMAyor = eventoMayorCap.shift()
        //console.log(eventoCapidadMAyor);
        crearTercerTd(eventoCapidadMAyor, $tercerRdo)


    }).catch(err => console.log(err))



//------------------------FUNCIONES--------------------------//

function filterCaterogory(datos) {              //
    let categoryRepeated = []
    for (const event of datos) {

        categoryRepeated.push(event.category)
    }
    return categoryRepeated
}

function eventoMayorPorcentajeAsistencia(eventos) { //MAYOR Y MENOR %

    let auxiliar = eventos.map(evento => {
        return {
            nombre: evento.name,
            asistencia: (evento.assistance / evento.capacity) * 100,
        }

    })
    auxiliar.sort((a, b) => b.asistencia - a.asistencia);
    return auxiliar
};

function mayorCapacidad(eventos) {            //MAYOR CAPACIDAD
    let aux = eventos.map(evento => {
        return {
            nombre: evento.name,
            capacidad: evento.capacity
        }
    })
    aux.sort((a, b) => b.capacidad - a.capacidad);
    return aux
}

//------------------//CREANDO PRIMER TABLA---------------//
function crearTd(objeto, container) { //CREAR TABLA1
    let td = ` <td > ${objeto.nombre} (${objeto.asistencia.toFixed(2)} %)</td>`
    container.innerHTML = td
}

function crearTercerTd(objeto, container) { //CREAR TABLA1
    let td = ` <td > ${objeto.nombre} (${objeto.capacidad})</td>`
    container.innerHTML = td

}

//------------CATEGORIAS CON TODOS SUS EVENTOS-----------//
function calcularEventosPorCategoria(eventos, categorias) {
    const eventosPorCat = categorias.map(categoria => {
        return eventos.filter(evento => evento.category === categoria);
    });
    return eventosPorCat;
}

//-------------PASADOS-----------------//
function calcularTotalIngresos(eventosDeUnaCategoria) {
    return eventosDeUnaCategoria.reduce((total, evento) => {
        return total + (evento.assistance * evento.price);
    }, 0);
}

function calcularTotalAsistencia(eventosDeUnaCategoria) {
    const totalAsistencia = eventosDeUnaCategoria.reduce((total, evento) => {
        return total + evento.assistance;
    }, 0);

    const totalCapacidad = eventosDeUnaCategoria.reduce((total, evento) => {
        return total + evento.capacity;
    }, 0);

    const porcentajeAsistencia = (totalAsistencia / totalCapacidad) * 100;

    return porcentajeAsistencia;
}
//-----------FUTUROS------------------------//
function calcularTotalEstimadoIngresos(eventosDeUnaCategoria) {
    return eventosDeUnaCategoria.reduce((total, evento) => {
        return total + (evento.estimate * evento.price);
    }, 0);
}

function calcularEstimadoTotalAsistencia(eventosDeUnaCategoria) {
    const totalAsistencia = eventosDeUnaCategoria.reduce((total, evento) => {
        return total + evento.estimate;
    }, 0);

    const totalCapacidad = eventosDeUnaCategoria.reduce((total, evento) => {
        return total + evento.capacity;
    }, 0);

    const porcentajeAsistencia = (totalAsistencia / totalCapacidad) * 100;

    return porcentajeAsistencia;
}

//--------------------- TABLAS 1 y 2 ------------------//
function crearTabla(resultado) {
    return `
    <td style="background-color: rgb(223, 174, 110)";>${resultado.categoria}</td>
    <td style="background-color: rgb(223, 174, 110);">$ ${resultado.revenues.toLocaleString()}</td>
    <td style="background-color: rgb(223, 174, 110);">${resultado.totalAsistencia.toFixed(2)} %</td> `
}

function printTabla(resultado, container) {
    for (const dato of resultado) {
        let templete = crearTabla(dato)
        container.innerHTML += templete

    }
}
