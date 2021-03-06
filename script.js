let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
document.getElementById("date").innerHTML = today;


let users =[];                                              //Empty array to store new user objects

const headers = ['First Name', 'Last Name', 'Username', 'Email', 'Actions'];     //header titles for table

let str = "";

let createForm = document.getElementById('createUserForm');     //Variable to store the form to create users, it is used to hide or display the form
let updateForm = document.getElementById('updateUserForm');     //Variable to store the form to update users, it is used to hide or display the form

let indexAux = 0;       //Aux variable to store the index when editing users

//Function that call the needed methods to start the app
function start(){

    //If the localStorage is empty, will add an admin user at the first position, It will prevent error when it try to display table
    //using an empty array of objects
    if(localStorage.length > 0){
    
        displayTable();
    
    }
    else{
        users = [{firstName: 'Admin', lastName: 'Admin', userName: 'admin', email: 'admin@email.com'}];
        let jsonObj = JSON.stringify(users);
        localStorage.setItem("users", jsonObj);

        displayTable();
    
    }


    hideUpdateUserForm();
}

//Hide create user form and display update user form
function hideCreateUserForm(){
    
    createForm.style.display = 'none';
    updateForm.style.display = '';
}

//Hide update user form and display create user form
function hideUpdateUserForm(){
    
    updateForm.style.display = 'none';
    createForm.style.display = '';

}

//Function to create user
//First add user into array of objects, then add the array of objects to localStorage
function createUser(){
    let firstName = document.getElementById('firstname').value;

    let lastName = document.getElementById('lastname').value;

    let userName = document.getElementById('username').value;

    let email = document.getElementById('email').value;

    //If one or more input fields are empty, an alert box will be displayed
    if(firstName === "" || lastName === "" || userName === "" || email === ""){
        //console.log("A field is empty");
        alert("One or more input fields are empty!!");
        return;
    }


    let obj = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
    }

    users.push(obj);

    jsonObj = JSON.stringify(users);
    localStorage.setItem("users", jsonObj);

    //Clear input fields after the user is created   
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';

    displayTable();


}


//Edit info of Users
//This will get the info and display it in the input fields
function editUser(i){

    indexAux = i;

    hideCreateUserForm();

    let fname = document.getElementById('firstnameUpdate');
    fname.setAttribute('value', `${users[i].firstName}`);
    console.log(users[i].firstName);

    let lname = document.getElementById('lastnameUpdate');
    lname.setAttribute('value', `${users[i].lastName}`);

    let uname = document.getElementById('usernameUpdate');
    uname.setAttribute('value', `${users[i].userName}`);

    let mail = document.getElementById('emailUpdate');
    mail.setAttribute('value', `${users[i].email}`);
}

//When the update button is pressed, it will replace the info in the array of objects, then it will replace the localStorage
function updateUser(){
    

    let firstName = document.getElementById('firstnameUpdate').value;
    let lastName = document.getElementById('lastnameUpdate').value;
    let userName = document.getElementById('usernameUpdate').value;
    let email = document.getElementById('emailUpdate').value;

    users[indexAux].firstName = firstName;
    users[indexAux].lastName = lastName;
    users[indexAux].userName = userName;
    users[indexAux].email = email;


    jsonObj = JSON.stringify(users);
    localStorage.setItem("users", jsonObj);

    // document.getElementById('firstnameUpdate').value = '';
    // document.getElementById('lastnameUpdate').value = '';
    // document.getElementById('usernameUpdate').value = '';
    // document.getElementById('emailUpdate').value = '';



    displayTable();
    start();
    
}

//Function to delete Users
function deleteElement(i){
    
    users.splice(i, 1);

    jsonObj = JSON.stringify(users);
    localStorage.setItem("users", jsonObj);

    displayTable();
}

//Clear localStorage
function clearLocalStorage(){
    let agree = confirm("Are you sure to execute this action?");
    if(agree){
        localStorage.clear();
        start();
    }
    
}


//Gets the string from localStorage and create an array of objects, then we can iterate the array to generate and display the table
function displayTable(){


    //local storage

    str = localStorage.getItem("users");
    users = JSON.parse(str);
    // console.log(localStorage.getItem("users"));
    ////

    let usersTable = document.getElementById('table');
    usersTable.innerHTML = '';
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-striped');

    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');


    //Iterate through the headers array to create table headers
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    let tbody = document.createElement('tbody');


    //The forEach iterate through the objects array
    users.forEach((user, index) => {

        let bodyRow = document.createElement('tr');

        //The for in iterate through the properties of an individual object
        //Create a new tr for each user
        for (let key in user){
            let cell = document.createElement('td');
            let textNode = document.createTextNode(user[key]);
            cell.appendChild(textNode);
            bodyRow.appendChild(cell);
            // console.log(user[key]);
            
        }

        //Add Edit button to each row
        let button = document.createElement('button');
        let buttonCell = document.createElement("td");
        button.innerText = "edit";
        //button.className = "btn btn-warning";
        button.setAttribute('class', 'btn btn-outline-warning');
        button.setAttribute('id', 'editButton' + index);
        button.setAttribute('onclick', `editUser(${index})`);
        button.style.marginRight = "10px";
        buttonCell.appendChild(button);
       // bodyRow.appendChild(buttonCell);

        //Add Delete button to each row
        let button2 = document.createElement('button');
        //let button2Cell = document.createElement("td");
        button2.innerText = "delete";
        //button2.className = "btn btn-danger";
        button2.setAttribute('class', 'btn btn-outline-danger');
        button2.setAttribute('id', 'deleteButton' + index);
        button2.setAttribute('onclick', `deleteElement(${index})`);
        //button2.style.marginLeft = "5px";
        buttonCell.appendChild(button2);
        bodyRow.appendChild(buttonCell);

        
        


        tbody.appendChild(bodyRow);
        table.appendChild(tbody);
    });
    usersTable.appendChild(table);

    totalRows = tbody.rows.length;
    //console.log(totalRows);
}



//displayTable();
start();



