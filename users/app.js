let $ = document
let body = document.body
let container = $.querySelector(".container")
let userMainBox = $.querySelector(".user-main-box")
let userBox = $.querySelectorAll(".user-box")
let userName = $.querySelector(".user-name")
let userEmail = $.querySelector(".user-email")
let userPassword = $.querySelector(".user-password")
let deleteBtn = $.querySelectorAll(".delete-box")
let editBtn = $.querySelectorAll(".edit-box")
let themeBtn = $.querySelector(".theme-btn")
let themeBtnInside = $.querySelector(".fa-solid")
let allText = $.querySelectorAll("p")
let modalBox = $.querySelector(".delete-modal-box")
let deleteModalBtn = $.querySelector(".delete-modal-btn")
let noModalBtn = $.querySelector(".no-modal-btn")
let userId = null
let editUserid = null
let nameInput = $.querySelector("#name_input")
let emailInput = $.querySelector("#email_input")
let passwordInput = $.querySelector("#password_input")
let modalText = $.querySelector(".modal-text")
let editModalBox = $.querySelector(".edit-modal-box")
let currentTheme = localStorage.getItem("theme");
let form = $.querySelector("form")
let inputs = $.querySelectorAll("input")

themeBtn.addEventListener("click", changeTheme)

if (currentTheme === "dark") {
    applyDarkMode();
} else {
    applyLightMode();
}


function applyDarkMode() {
    body.classList.add("body-dark-mode");
    userMainBox.classList.add("user-main-box-dark-mode")
    userBox.forEach(element => element.classList.add("user-box-dark-mode"))
    deleteBtn.forEach(element => element.classList.add("delete-box-dark-mod"))
    editBtn.forEach(element => element.classList.add("edit-box-dark-mod"))
    allText.forEach(element => element.classList.add("text-white"));
    container.classList.add("user-main-box-dark-mode")
    themeBtnInside.style.color = "white"
    themeBtnInside.classList.replace("fa-moon", "fa-sun");
    modalText.style.color = "white"
    localStorage.setItem("theme", "dark");
}

function applyLightMode() {
    body.classList.remove("body-dark-mode");
    userMainBox.classList.remove("user-main-box-dark-mode")
    userBox.forEach(element => element.classList.remove("user-box-dark-mode"))
    deleteBtn.forEach(element => element.classList.remove("delete-box-dark-mod"))
    editBtn.forEach(element => element.classList.remove("edit-box-dark-mod"))
    allText.forEach(element => element.classList.remove("text-white"));
    container.classList.remove("user-main-box-dark-mode")
    themeBtnInside.style.color = "black"
    themeBtnInside.classList.replace("fa-sun", "fa-moon");
    modalText.style.color = "black"
    inputs.forEach(input => input.style.color = "black")
    document.documentElement.style.setProperty('--placeHolder', 'black');
    localStorage.setItem("theme", "light");
}

function changeTheme() {
    if (body.classList.contains("body-dark-mode")) {
        applyLightMode();
    } else {
        applyDarkMode();
    }
    window.location.reload()
}


window.addEventListener("load", loadUser)

function loadUser() {
    fetch("https://firstfirebaseproject-ecc0a-default-rtdb.firebaseio.com/users.json")
        .then(res => res.json())
        .then(data => {
            let usersData = Object.entries(data)
            userMainBox.innerHTML = ""
            usersData.forEach(user => {
                if (currentTheme === "dark") {
                    userMainBox.insertAdjacentHTML("beforeend", `
                            <div class="user-box user-box-dark-mode">
                        <div class="user-profile-box d-flex-center">
                            <img src="images/users (1).png" alt="" class="user-image">
                        </div>
                        <div class="user-detail-box d-flex-center">
                            <p class="user-name text-white">${user[1].name}</p>
                            <p class="user-email text-white">${user[1].email}</p>
                            <p class="user-password text-white">${user[1].password}</p>
                        </div>
                        <div class="control-box d-flex-center">
                            <div class="delete-box d-flex-center delete-box-dark-mod" onclick="showModal('${user[0]}')">Delete</div>
                            <div class="edit-box d-flex-center edit-box-dark-mod" onclick="showEditModal('${user[0]}')">Edit</div>
                        </div>
                    </div>`)
                } else {
                    userMainBox.insertAdjacentHTML("beforeend", `
                            <div class="user-box">
                        <div class="user-profile-box d-flex-center">
                            <img src="images/users (1).png" alt="" class="user-image">
                        </div>
                        <div class="user-detail-box d-flex-center">
                            <p class="user-name">${user[1].name}</p>
                            <p class="user-email">${user[1].email}</p>
                            <p class="user-password">${user[1].password}</p>
                        </div>
                        <div class="control-box d-flex-center">
                            <div class="delete-box d-flex-center" onclick="showModal('${user[0]}')">Delete</div>
                            <div class="edit-box d-flex-center" onclick="showEditModal('${user[0]}')">Edit</div>
                        </div>
                    </div>`)
                }
            })
        })
}

function showModal(userID) {
    modalBox.classList.add("modal-show")
    userId = userID
}

function closeModal() {
    modalBox.classList.remove("modal-show")
}

function deleteUser() {
    console.log("deleted");

    fetch(`https://firstfirebaseproject-ecc0a-default-rtdb.firebaseio.com/users/${userId}.json`, {
        method: "DELETE"
    }).then(res => console.log(res))
    closeModal()
    setTimeout(() => {
        location.reload()
    }, 1000);
}

deleteModalBtn.addEventListener("click", deleteUser)
noModalBtn.addEventListener("click", closeModal)


function showEditModal(userID) {
    editModalBox.classList.add("show-edit-modal")
    editUserid = userID
}

function editUser() {
    let newUserData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }
    fetch(`https://firstfirebaseproject-ecc0a-default-rtdb.firebaseio.com/users/${editUserid}.json`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newUserData)
    })
        .then(res => {
            console.log(res);
            closeEditModal()
            setTimeout(() => {
                location.reload()
            }, 1000);
        })
}
function closeEditModal() {
    editModalBox.classList.remove("show-edit-modal")
}
form.addEventListener("submit", (e) => {
    e.preventDefault()
    editUser()
})