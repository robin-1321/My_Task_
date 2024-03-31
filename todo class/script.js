const addUser = document.getElementById('adduser');
const btn = addUser.innerText;
const userName = document.getElementById('username');
const records = document.getElementById('records');


let userArray = []
let edit_id = null

let objStr = localStorage.getItem('users')

if(objStr!=null){
userArray = JSON.parse(objStr)
}
displayInfo();

addUser.onclick = () => {

    const name = userName.value;

    if(edit_id!=null){
        userArray.splice(edit_id,1,{'name' : name})
        edit_id = null

    }else{

        userArray.push({'name' : name})

    }

    saveInfo(userArray)
    userName.value = ''
    
    addUser.innerHTML = btn
}

function saveInfo(userArray){
   let str = JSON.stringify(userArray)
    localStorage.setItem('users',str)
    displayInfo();
}

function displayInfo(){
    let statement = ''
    userArray.forEach((user,i) => {
        statement += ` <tr>
        <th scope="row">${i+1}</th>
        <td class="text-capitalize">${user.name}</td>
        <td><i class="btn text-white fa-solid fa-pen-to-square btn-info mx-3" onclick="editInfo(${i})"> </i> <i class="btn btn-danger text-white fa-solid fa-trash-can" onclick="deleteInfo(${i})"></i></td>
        
      </tr>`;
        
    });
    records.innerHTML = statement;

}

function editInfo(id){
 
    edit_id = id
    userName.value = userArray[id].name
    addUser.innerHTML = 'Save'
    userName.focus()
}

function deleteInfo(id){

    userArray.splice(id,1);
    saveInfo(userArray);
   
}