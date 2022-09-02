let btn = document.getElementById('btn');
let tabla = document.getElementById('tabla');

function compare(a,b) {
    if (parseInt(a[1].puntaje) > parseInt(b[1].puntaje))
       return -1;
    if (parseInt(a[1].puntaje) < parseInt(b[1].puntaje))
      return 1;
    return 0;
  }
  
(function () {

    let playerId;
    let playerRef;
    let msjRef;

    btn.addEventListener('click', cargarPuntaje)


    function sendMsj(){
        let message = document.getElementById('msj').value;
        msjRef = firebase.database().ref(`players/${playerId}/msj`);



    }
    //function showMsg() {
       // const puntajes = firebase.database().ref('messages');

        //messages.on('child_added', (snap) => {
          //  const arr = snap.val()
            //showMsj.innerHTML += `<p>${arr}</p>`
        //})

    //}
    function test() {
        const players = firebase.database().ref('players');
        const puntajeRef = firebase.database().ref(`puntajes/`);


        console.log(playerId)

        players.on('child_added', (snap) => {
            const arr = snap.val()
            console.log(`${arr.name} joined`)
        })

        players.on('child_removed', (snap) => {
            const arr = snap.val()
            console.log(`${arr.name} left`)
        })
        puntajeRef.on('value', (snap) => {
            const personas = Object.entries(snap.val());
            const personasOrder = personas.sort(compare);
            tabla.innerHTML = '';


            personas.sort(compare);
            console.log(personasOrder)

            personasOrder.forEach(persona => {
                console.log(persona)
                tabla.innerHTML += `<p>${persona[0]}: ${persona[1].puntaje}</p>`
            });
        })


        

    }
    function cargarPuntaje(){
        const aka = document.getElementById('aka').value;
        const puntaje = document.getElementById('puntaje').value;
        const puntajeRef = firebase.database().ref(`puntajes/${aka}`);

        puntajeRef.set({
            puntaje: puntaje
        })



    }
  
    firebase.auth().onAuthStateChanged((user) => {

        if (user) {
            //Logged in!
            playerId = user.uid;
            playerRef = firebase.database().ref(`players/${playerId}`);

            playerRef.set({
                id: playerId,
                name: Math.floor(Math.random() * 100),
                color: "red",
                msj: []
            })
            

            //Remove player when disconnected.
            
            playerRef.onDisconnect().remove();
            test();
            //showMsg();

        } else {
            //Logged out!

        }


    })
  

    firebase.auth().signInAnonymously().catch(e => {
        let errorCode = e.code;
        let errorMessage = error.message;

        console.log(errorCode, errorMessage);
    });


})();


