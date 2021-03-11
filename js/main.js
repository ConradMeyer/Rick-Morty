// CONSTANTES
const contenedor = document.querySelector(".contenedorGeneral");
const resultado = document.querySelector(".resultado");
const input = document.querySelector("#input");
const buscar = document.querySelector("#btnBuscar");
const reset = document.querySelector("#btnReset");
const favoritos = document.querySelector("#favoritos")

// FUNCIONES
function fetchData(search) {
    fetch(`https://rickandmortyapi.com/api/character/?name=${search}`)
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem(`search-${search}`, JSON.stringify(data))
        return data
    })
    .then(data => {data.results.map(el => pintar(el))});
} 

function pintar(el) {
    let caja = document.createElement("div")
    resultado.appendChild(caja)

    let h2 = document.createElement("h2")
    let text = document.createTextNode(el.name)
    h2.appendChild(text)
    caja.appendChild(h2)
    
    h2.addEventListener("click", function(){
        detalle(el)
        limpiar()
    })
}

function detalle(el) {
    let caja = document.createElement("div")
    caja.setAttribute("class", "detalle")
    contenedor.appendChild(caja)
    
    let box = document.createElement("div")
    caja.appendChild(box)

    let h2 = document.createElement("h2")
    let text = document.createTextNode(el.name)
    h2.appendChild(text)
    box.appendChild(h2)

    let img = document.createElement("img")
    img.setAttribute("src", el.image)
    box.appendChild(img)

    let status = document.createElement("p")
    let statusText = document.createTextNode(`ESTADO: ${el.status}`)
    status.appendChild(statusText)
    box.appendChild(status)

    let species = document.createElement("p")
    let speciesText = document.createTextNode(`ESPECIE: ${el.species}`)
    species.appendChild(speciesText)
    box.appendChild(species)

    let genero = document.createElement("p")
    let generoText = document.createTextNode(`GÉNERO: ${el.gender}`)
    genero.appendChild(generoText)
    box.appendChild(genero)

    let volver = document.createElement("button")
    let volverText = document.createTextNode("Volver")
    volver.appendChild(volverText)
    box.appendChild(volver)

    let guardar = document.createElement("button")
    let guardarText = document.createTextNode("Guardar")
    guardar.appendChild(guardarText)
    box.appendChild(guardar)

    let objeto = {
        id: `${el.id}`,
        name: `${el.name}`,
        image: `${el.image}`,
        status: `${el.status}`,
        species: `${el.species}`,
        gender: `${el.gender}`
    }

    guardar.addEventListener("click", ()=> {
        sendData(objeto)
        readData()})

    volver.addEventListener("click", function(){
        resultado.classList.remove("desaparece")
        resultado.classList.add("resultado")
        caja.remove()

    })

}

function favorito(el) {
    let caja = document.createElement("div")
    caja.setAttribute("class", "cajaFavoritos")

    let h3 = document.createElement("h3")
    let text = document.createTextNode(el.name)
    h3.appendChild(text)

    let delet = document.createElement("h3")
    let deletText = document.createTextNode(" -X")
    delet.appendChild(deletText)

    caja.appendChild(h3)
    caja.appendChild(delet)
    favoritos.appendChild(caja)

    delet.addEventListener("click", function(){
        borrarFavorito(el)
    })
    h3.addEventListener("click", function(){
        detalle(el)
        limpiar()
    })
}

function limpiar() {
    resultado.setAttribute("class", "desaparece")
}

function resete() {
    resultado.querySelectorAll('*').forEach(n => n.remove())
    // document.querySelector('.detalle').remove()
    input.value = "";
}

function resetFav() {
    document.querySelectorAll('#favoritos .cajaFavoritos').forEach(n => n.remove())
}

// EVENTOS
buscar.addEventListener("click", function() {
    if ( !sessionStorage.getItem(`search-${input.value}`) ){
        fetchData(input.value);
    } else {
        let sesion = JSON.parse(sessionStorage.getItem(`search-${input.value}`))
        sesion.results.map(el => pintar(el))
    }
})

reset.addEventListener("click", ()=> resete());
