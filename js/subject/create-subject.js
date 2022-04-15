
const inputSubjectCode = document.getElementById('subjectCode');
const inputSubjectName = document.getElementById('subjectName');
const btnCreateSubject = document.getElementById('btnCreateSubject');

btnCreateSubject.onclick = (event) => {

    event.preventDefault();
    
    if(inputSubjectName.value == ''){
        alert('WARNING: Subject Code is a mandatory form field');
        return;
    }

    if(inputSubjectName.value == ''){
        alert('WARNING: Subject Name is a mandatory form field');
    }

    const data = {
        subjectName: inputSubjectName.value,
        subjectNameLowerCase: inputSubjectName.value.toLowerCase(),
        subjectCode: inputSubjectCode.value
    };

    dbRefUsers.child(firebase.auth().currentUser.uid)
              .push(data)
              .then(() => {
                  alert(`Disciplina ${data.subjectName} adicionada com sucesso!`);
                  console.log(`Disciplina ${data.subjectName} adicionada com sucesso!`);
              })
              .catch((error) => {
                  console.log(error);
              });
    
    resetInputFields();
};

function resetInputFields(){
    inputSubjectName.value = "";
    inputSubjectCode.value = "";
}