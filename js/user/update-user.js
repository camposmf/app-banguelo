
const inputUsername = document.getElementById('inputUsername');
const inputUpdateUsername = document.getElementById('inputUpdateUsername');
const formUpdateUsername = document.getElementById('formUpdateUsername');

formUpdateUsername.onsubmit = (event) => {
    event.preventDefault();

    firebase.auth().currentUser.updateProfile({
        displayName: inputUpdateUsername.value
    }).catch((error) => {
        alert('Failed on update username. ', error);
    }).finally(() => {
        window.location.href = "../pages/home.html";
    });

}