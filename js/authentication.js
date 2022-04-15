
firebase.auth().languageCode = 'pt-BR';

const btnPassword = document.getElementById("btnPassword");
const btnCreateUser = document.getElementById("btnCreateUser");
const formAuthLogin = document.getElementById("form-auth-login");
const btnRestorePassword = document.getElementById("btnRestorePassword");

if(formAuthLogin){
    formAuthLogin.onsubmit = (event) => {
        event.preventDefault();
        firebase.auth()
                .signInWithEmailAndPassword(formAuthLogin.inputEmail.value, formAuthLogin.inputPassword.value)
                .catch((error) => {
                    console.log('Falha no acesso: ', error);
                });
        
    }
}

if(btnCreateUser){
    btnCreateUser.onclick = () => {
        window.location.href = "./pages/create-user.html";
    }
}

if(btnPassword){
    btnPassword.onclick = () => {
        window.location.href = "./pages/update-password.html";
    }
}

if(btnRestorePassword){
    btnRestorePassword.onclick = () => {
        const inputEmailToUpdate = document.getElementById("inputEmailToUpdate");
        if(inputEmailToUpdate.value) {
            firebase.auth()
                    .sendPasswordResetEmail(inputEmailToUpdate.value, actionCodeSettings)
                    .then(function () {
                        alert('An E-mail has been sent to ' + inputEmailToUpdate.value + '. Check your inbox');
                        window.location.href = "../index.html";
                    }).catch(function (error) {
                        showError('Failed to send you a e-mail to restart your password: ', error);
                    });
        }
    }
}


firebase.auth()
         .onAuthStateChanged((user) => {

            if(user){
                console.log(`Usuário logado - ${user.email}`);
                window.location.href = "./pages/home.html";
            }

         });




