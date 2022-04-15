
const inputEmail = document.getElementById('inputEmail');
const btnCheckEmail = document.getElementById('btnCheckEmail');
const inputUsername = document.getElementById('inputUsername');
const inputEmailStatus = document.getElementById('inputEmailStatus');

btnCheckEmail.onclick = (event) => {
    event.preventDefault();

    let currentUser = firebase.auth().currentUser;
    currentUser.sendEmailVerification(actionCodeSettings).then(() => {
        alert(`An verification e-mail has been sent to ${currentUser.email}! Check your inbox`);
    }).catch((error) => {
        console.log(error);
    });
}

window.onload = (event) => {
    
    event.preventDefault();
    firebase.auth().onAuthStateChanged((user) => {

        inputEmail.value = user.email;

        if(user.emailVerified == true)
            inputEmailStatus.value = "E-mail verified";
        else
            inputEmailStatus.value = "E-mail not verified";

        if(user.displayName == null)
            inputUsername.value = "Username not definied";
        else
            inputUsername.value = user.displayName;
    });
}

function signOut() {
    firebase.auth()
            .signOut()
            .catch((error) => {
                console.log(`Falha ao sair da Conta: ${error}`);
            });
    
    window.location.href = "../../index.html";
}