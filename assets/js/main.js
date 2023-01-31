let selectedRow = null;
let studentsArray = [];


// mostrar alertas
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main")
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Limpiar los campos
function clearFields(){
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
}

// Agregar datos

document.querySelector("#student-form").addEventListener("submit", (e) =>{
    e.preventDefault();


    const firtsName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    // validacion
    if(firtsName == "" || lastName == "" || rollNo == ""){
        showAlert("Porfavor rellenar los campos", "danger");
    }
    else{
        if(selectedRow == null){
            studentsArray.push({firtsName: firtsName, lastName: lastName, rollNo: rollNo});
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${firtsName}</td>
            <td>${lastName}</td>
            <td>${rollNo}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Estudiante agregado", "success");
            localStorage.setItem("studentsArray", JSON.stringify(studentsArray));
        }
        else{
            selectedRow.children[0].textContent = firtsName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            selectedRow = null;
            showAlert("Estudiante informacion editada", "info");
            localStorage.setItem("students", list.innerHTML);
        }

        clearFields();
    }
});

// Editar informacion

document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
        document.querySelector("#student-form").addEventListener("submit", (e) =>{
            

            clearFields();
        });
    }
    
});



// Borrar informacion

document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Estudiante informacion eliminada", "danger");
        localStorage.removeItem("studentsArray");
    }
});

// cargar datos del localStorage

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("studentsArray")) {
        studentsArray = JSON.parse(localStorage.getItem("studentsArray"));
            const list = document.querySelector("#student-list");
            studentsArray.forEach(student => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.firtsName}</td>
                <td>${student.lastName}</td>
                <td>${student.rollNo}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                `;
            list.appendChild(row);
        });
    }
});
