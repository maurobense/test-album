let btn = document.getElementById('btn');
let showMsj = document.getElementById('msjs');

(function () {

    let playerId;
    let playerRef;
    let msjRef;

    btn.addEventListener('click', sendMsj)

    function sendMsj(){
        let message = document.getElementById('msj').value;
        msjRef = firebase.database().ref(`players/${playerId}/msj`);
        const messagges = firebase.database().ref('messages');

        messagges.push(message)

        msjRef.push(message)

    }
    function showMsg() {
        const messages = firebase.database().ref('messages');

        messages.on('child_added', (snap) => {
            const arr = snap.val()
            showMsj.innerHTML += `<p>${arr}</p>`
        })


    }
    function test() {
        const players = firebase.database().ref('players');

        console.log(playerId)

        players.on('child_added', (snap) => {
            const arr = snap.val()
            console.log(`${arr.name} joined`)
        })

        players.on('child_removed', (snap) => {
            const arr = snap.val()
            console.log(`${arr.name} left`)
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
            showMsg();

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


