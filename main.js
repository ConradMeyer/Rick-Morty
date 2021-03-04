// CONSTANTES
const contenedor = document.querySelector(".contenedorGeneral");
const resultado = document.querySelector(".resultado");
const input = document.querySelector("#input");
const buscar = document.querySelector("#btnBuscar");
const reset = document.querySelector("#btnReset");
const favoritos = document.querySelector("#favoritos")
const firebaseConfig = {
    apiKey: "AIzaSyBVYsgaLcnJ9NihColWMG2zTyMozhCjIxE",
    authDomain: "base-data-test.firebaseapp.com",
    databaseURL: "https://base-data-test-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "base-data-test",
    storageBucket: "base-data-test.appspot.com",
    messagingSenderId: "456393588318",
    appId: "1:456393588318:web:0832efd1c1b61af4a6fecf"
};
firebase.initializeApp(firebaseConfig);


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

function pintar (el) {
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

function detalle (el) {
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
        name: `${el.name}`,
        image: `${el.image}`,
        status: `${el.status}`,
        species: `${el.species}`,
        gender: `${el.gender}`
    }

    guardar.addEventListener("click", ()=> sendData(objeto))

    volver.addEventListener("click", function(){
        resultado.classList.remove("desaparece")
        resultado.classList.add("resultado")
        caja.remove()

    })

}

function sendData(obj) {
    let num = 0;
    firebase.database().ref('objetos/'+ num).update(obj)
    num++
}

function readData() {
       // Acceder a la base de datos
       const database = firebase.database();
    
       // Pedir datos
       const objetos = database.ref('objetos');
       
       objetos.on('value', (response) => {
           const data = response.val();
           data.map(el => {favorito(el)});
       });
}

function favorito(el) {
    let h3 = document.createElement("h3")
    let text = document.createTextNode(el.name)
    h3.appendChild(text)
    favoritos.appendChild(h3)
    
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
    input.value = "";
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

reset.addEventListener("click", resete);


readData();