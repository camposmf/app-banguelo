
const formCreateUser = document.getElementById('form-create-user');
const btnLogoff = document.getElementById('btnLogoff');

formCreateUser.onsubmit = (event) => {
    event.preventDefault();
    firebase.auth()
            .createUserWithEmailAndPassword(formCreateUser.inputEmail.value, formCreateUser.inputPassword.value)
            .catch((error) => {
                console.log('Falha no cadastro: ', error);
            });
}

btnLogoff.onclick = () => {
    window.location.href = "../../index.html";
}

firebase.auth()
        .onAuthStateChanged((user) => {
        if(user){
            console.log("Usuário criado");
            window.location.href = "../../pages/home.html";
        }
});
