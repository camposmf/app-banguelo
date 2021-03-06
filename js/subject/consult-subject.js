const tableSubject = document.querySelector('.table .tbody');
const updateSubject = document.getElementById('updateSubject');
const consultSubject = document.getElementById('consultSubject');

const inputSubjectId = document.getElementById('subjectId');
const inputSubjectCode = document.getElementById('subjectCode');
const inputSubjectName = document.getElementById('subjectName');
const inputSubjectFile = document.getElementById('subjectFile');

const btnCancel = document.getElementById('btnCancel');
const currentLink = document.getElementById('currentLink');
const btnUpdateSubject = document.getElementById('btnUpdateSubject');

let itemKey;

window.onload = (event) => {
    event.preventDefault();

    if(consultSubject)
        consultSubject.setAttribute('class', 'd-block');
    
    if(updateSubject)
        updateSubject.setAttribute('class', 'd-none');
    
    firebase.auth().onAuthStateChanged((user) => {
        dbRefUsers.child(firebase.auth().currentUser.uid)
                  .orderByChild('subjectName')
                  .on('value', (dataSnapshot) => {
                      loadDataToTable(dataSnapshot);
                  });
    });
}

if(btnCancel){
    btnCancel.onclick = () => {
        currentLink.innerText = "Consult Subject";
        consultSubject.setAttribute('class', 'd-block');
        updateSubject.setAttribute('class', 'd-none');
    }
}

if(btnUpdateSubject){
    btnUpdateSubject.onclick = (event) => {
        event.preventDefault();
        
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
                                  .child(itemKey)
                                  .update(data)
                                  .then(() => {
                                      console.log(`Subject has been updated successfully`);
                                  })
                                  .catch((error) => {
                                      alert('Failed to updated subject. ', error);
                                  });
            
                        currentLink.innerText = "Consult Subject";
                        consultSubject.setAttribute('class', 'd-block');
                        updateSubject.setAttribute('class', 'd-none');

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
                          .child(itemKey)
                          .update(data)
                          .then(() => {
                              console.log(`Subject has been updated successfully`);
                          })
                          .catch((error) => {
                              alert('Failed to updated subject. ', error);
                          });
                
                currentLink.innerText = "Consult Subject";
                consultSubject.setAttribute('class', 'd-block');
                updateSubject.setAttribute('class', 'd-none');

            }

        }

    }
}

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

function loadDataToTable(dataSnapshot){
    
    let counter = 1;
    const tbodySubject = document.getElementById('tbodySubject');
    tbodySubject.innerText = '';
    
    dataSnapshot.forEach((child) => {
        let childValue = child.val();

        let tableRow = tbodySubject.insertRow();
        let tdId     = tableRow.insertCell();
        let tdCode   = tableRow.insertCell();
        let tdName   = tableRow.insertCell();
        let tdEdit   = tableRow.insertCell();
        let tdRemove = tableRow.insertCell();

        tdId.innerText   = counter;
        tdCode.innerText = childValue.subjectCode;
        tdName.innerText = childValue.subjectName;

        let btnEdit = document.createElement('button');
        btnEdit.innerText = 'Update';
        btnEdit.classList.add('btn');
        
        let btnRemove = document.createElement('button');
        btnRemove.innerText = 'Delete';
        btnRemove.classList.add('btn');

        btnEdit.classList.add('btn');
        btnEdit.classList.add('btn-edit');

        btnRemove.classList.add('btn');
        btnRemove.classList.add('btn-remove');

        btnRemove.setAttribute('onclick', `deleteSubject('${child.key}')`);
        btnEdit.setAttribute('onclick', `prepareUpdateSubject('${counter}', 
                                                              '${childValue.subjectCode}', 
                                                              '${childValue.subjectName}', 
                                                              '${childValue.imgUrl}',
                                                              '${child.key}')`);
        
        tdEdit.appendChild(btnEdit);
        tdRemove.appendChild(btnRemove);
        counter++;
    });
}

function prepareUpdateSubject(subjectId,subjectCode, subjectName, subjectFile, childKey){

    itemKey = childKey;

    if(consultSubject)
        consultSubject.setAttribute('class', 'd-none');
    
    currentLink.innerText = "Update Subject";
    updateSubject.setAttribute('class', 'd-block');
    updateSubject.setAttribute('class', 'container');
    updateSubject.setAttribute('class', 'form-group');
    updateSubject.setAttribute('class', 'page-content');

    inputSubjectId.value = subjectId;
    inputSubjectCode.value = subjectCode;
    inputSubjectName.value = subjectName;
    inputSubjectFile.innerHTML = subjectFile;
    
}

function deleteSubject(itemKey) {
    
    let isRemoveConfirm = confirm('Are you sure you want to delete?');

    if(isRemoveConfirm){
        dbRefUsers.child(firebase.auth().currentUser.uid)
                  .child(itemKey)
                  .remove()
                  .then(() => {
                    console.log(`Subject ${itemKey} has been removed successfully`);
                  })
                  .catch((error) => {
                    alert('Failed when trying to delete subject. ', error);
                  });
    }
}