let btn = document.getElementById('btn');
let tabla = document.getElementById('tabla');
let btnCompe = document.getElementById('btn_compe');
let select_cont = document.getElementById('select_cont');
let pantalla_carga = document.getElementById('carga_puntaje')
function compare(a, b) {
    if (parseFloat(a[1].puntaje) > parseFloat(b[1].puntaje))
        return -1;
    if (parseFloat(a[1].puntaje) < parseFloat(b[1].puntaje))
        return 1;
    return 0;
}


(function () {

    let competencias = [{ id: 1241, nombre: "Hypnotic Palace", cod:1997 },
                        {id: 2162, nombre: "Dark Jail", cod:1231},
                        {id:3145, nombre: "Chekerau", cod:1111}]
    let compeId;
    let compeRef;
    let compe;
    let miCompe = null;
    let allCompesRef = firebase.database().ref(`competencias/`);
    let all_compes = [];

    select_cont.addEventListener('click', function(){
        pantalla_carga.style.display = 'none';
        miCompe = null;
    })

    allCompesRef.on('value', snap => {
        let compes = Object.entries(snap.val())

        all_compes = []
        compes.forEach(element => {
            all_compes.push(element[0])
        });
    })

    btn.addEventListener('click', cargarPuntaje)
    btnCompe.addEventListener('click', elegirCompe);
    function loadSelect() {
        let htmlInject = '';
        htmlInject += `<select id="compe">`
        competencias.forEach(compe => {
            htmlInject += `<option value="${compe.id}">${compe.nombre}</option>`

        });
        htmlInject += `</select>`
        select_cont.innerHTML = htmlInject;
    }
    loadSelect();




    function elegirCompe() {
        let com = document.getElementById('compe');
        let inp_pass = document.getElementById('pass_compe').value;

        tabla.innerHTML = "";

        compe = com.value;

        miCompe = logCompe(compe,inp_pass);



        if(miCompe != false){
        

        firebase.auth().onAuthStateChanged((user) => {

            if (user) {
                //Logged in!
                if(!all_compes.includes(compe)){
                compeId = compe;
                compeRef = firebase.database().ref(`competencias/${compeId}`);

                compeRef.set({
                    id: compeId,
                    name: miCompe.nombre,
                    competidores: []
                })
            }

                //Remove player when disconnected.

                //playerRef.onDisconnect().remove();
                test();
                pantalla_carga.style.display = "block";
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


    }
    }
    function test() {
        const puntajeRef = firebase.database().ref(`competencias/${compe}/competidores`);

        puntajeRef.on('value', (snap) => {
            console.log(snap.val())
            if (snap.val() != null) {
                const personas = Object.entries(snap.val());
                const personasOrder = personas.sort(compare);
                tabla.innerHTML = '';


                personas.sort(compare);
                console.log(personas)

                personasOrder.forEach(persona => {
                    console.log(persona)
                    tabla.innerHTML += `<p>${persona[0]}: ${persona[1].puntaje}</p>`
                });
            }
        })




    }
    function cargarPuntaje() {
        const aka = document.getElementById('aka').value;
        const puntaje = document.getElementById('puntaje').value;
        const puntajeRef = firebase.database().ref(`competencias/${compe}/competidores/${aka}`);

        puntajeRef.set({
            puntaje: puntaje
        })

    }

    function logCompe(id,pass){
        let i = 0;
        while(i < competencias.length){
            if(competencias[i].id == id && competencias[i].cod == pass){
                return competencias[i];
            }
            i++;
        }
        return false;

    }
})();


