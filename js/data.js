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

function sendData(obj) {
    firebase.database().ref('objetos/'+ obj.id).update(obj)
}

function readData() {
    // Acceder a la base de datos
    const database = firebase.database();
 
    // Pedir datos
    const objetos = database.ref('objetos');
    
    objetos.on('value', (response) => {
        const data = response.val();
        resetFav()
        Object.values(data).map(el => {favorito(el)});
    });
}

function borrarFavorito(favorito) {
    firebase.database().ref('objetos/'+ favorito.id).remove()
}

readData();