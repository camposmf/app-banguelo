
window.onload = () => {

    let isAccountToBeDeleted = confirm('Would like to delete this account?');
    if(isAccountToBeDeleted){
        
        firebase.auth().onAuthStateChanged((user) => {
            user.delete().then(() => {
                alert('Account has been deleted.');    
                signOut();
                window.location.href = "../index.html";
            }).catch((error) => {
                alert('Failed on deleting account. ', error);
            })
        });
    }
}

function signOut() {
    firebase.auth()
            .signOut()
            .catch((error) => {
                console.log(`Falha ao sair da Conta: ${error}`);
            });
}