
const inputSubjectCode = document.getElementById('subjectCode');
const inputSubjectName = document.getElementById('subjectName');
const inputSubjectFile = document.getElementById('subjectFile');
const btnCreateSubject = document.getElementById('btnCreateSubject');


btnCreateSubject.onclick = (event) => {

    event.preventDefault();

    if(inputSubjectName.value == ''){
        alert('WARNING: Subject Code is a mandatory form field');
        return;
    }

    if(inputSubjectName.value == ''){
        alert('WARNING: Subject Name is a mandatory form field');
        return;
    }

    let getFile     = inputSubjectFile.files[0];
    let getFileType = getFile.type;
    let getFileName = getFile.name;
    
    if (getFile = ! null) {

        if (getFileType.includes('image')) {

            let imgName = firebase.database().ref().push().key + '-' + getFileName;
            let imgPath = 'banguelinhaFiles/' + firebase.auth().currentUser.uid + '/' + imgName;

            let storageRef = firebase.storage().ref(imgPath);
            let uploadFile = storageRef.put(inputSubjectFile.files[0]);

            handleUploadFile(uploadFile).then(() => {

                storageRef.getDownloadURL().then((downloadUrl) => {
                
                    const data = {
                        imgUrl: downloadUrl,
                        subjectCode: inputSubjectCode.value,
                        subjectName: inputSubjectName.value,
                        subjectNameLowerCase: inputSubjectName.value.toLowerCase()
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
    
                }).catch((error) => {
                    console.log('Falha ao adicionar disciplina: ', error);
                });

            });
            
        } else {
            console.log('corrida');

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

        }

    }

};

function handleUploadFile(uploadFile){
    return new Promise((resolve, reject) => {
        uploadFile.on('state_changed', 
                   function(snapshot){
                       console.log((snapshot.bytesTransferred / snapshot.totalBytes * 100).toFixed(2) + '%');
                   },
                   function (error) {
                    reject(error)
                   },
                   function () {
                    console.log('Sucesso no upload')
                    resolve()
                  });
    });
}

function resetInputFields() {
    inputSubjectName.value = "";
    inputSubjectCode.value = "";
    inputSubjectFile.value = "";
}