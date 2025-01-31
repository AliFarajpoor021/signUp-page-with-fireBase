let $ = document;
let body = $.body;
let allText = $.querySelectorAll(".text");
let themeBtn = $.querySelector(".theme-btn");
let themeBtnInside = $.querySelector(".fa-solid");
let mainBox = $.querySelector(".main-box");
let leftBox = $.querySelector(".left-box")
let bottomBox = $.querySelector(".bottom-box")
let inputs = $.querySelectorAll("input")
let nameInput = $.querySelector("#name_input")
let emailInput = $.querySelector("#email_input")
let passwordInput = $.querySelector("#password_input")
let formElem = $.querySelector("form")
let link = $.querySelector("a")
themeBtn.addEventListener("click", changeTheme);
let currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
    applyDarkMode();
} else {
    applyLightMode();
}
function updateThemeUI(isDark) {
    document.documentElement.style.setProperty("--placeHolder", isDark ? "#E2DFD0" : "black");
    themeBtnInside.style.color = isDark ? "white" : "black";
}
function applyDarkMode() {
    body.classList.add("body-dark-mod");
    mainBox.classList.add("main-box-dark-mod");
    allText.forEach(element => element.classList.add("text-white"));
    themeBtnInside.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.boxShadow = "0px 5px 5px rgb(255 255 255 / 41%)"
        })
        input.addEventListener("blur", () => {
            input.style.boxShadow = "none"
        })
    })
    link.style.color="white"
    updateThemeUI(true);
}
function applyLightMode() {
    body.classList.remove("body-dark-mod");
    mainBox.classList.remove("main-box-dark-mod");
    allText.forEach(element => element.classList.remove("text-white"));
    themeBtnInside.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.boxShadow = "0px 5px 5px rgb(0 0 0 / 41%)"
        })
        input.addEventListener("blur", () => {
            input.style.boxShadow = "none"
        })
    })
    link.style.color="black"
    updateThemeUI(false);
}
function changeTheme() {
    if (body.classList.contains("body-dark-mod")) {
        applyLightMode();
    } else {
        applyDarkMode();
    }
}
let colors = ["#C62828", "#FF6F00", "#1B5E20"];
let texts = ["Please do not enter detailed information!", "Enjoy using this site.", "Made by AF"];
let currentIndex = 0;

function changeLeftBoxColor() {
    setInterval(() => {
        leftBox.style.backgroundColor = colors[currentIndex];
        let p = leftBox.querySelector("p");
        p.textContent = texts[currentIndex];
        currentIndex = (currentIndex + 1) % colors.length;
    }, 2000);
}
changeLeftBoxColor();

let colorsBottom = ["#C62828", "#FF6F00", "#1B5E20"];
let textsBottom = ["Please do not enter detailed information!", "Enjoy using this site.", "Made by AF"];
let currentIndexBottom = 0;
function changeBottomBoxColor() {
    setInterval(() => {
        bottomBox.style.backgroundColor = colorsBottom[currentIndexBottom];
        let p = bottomBox.querySelector("p");
        p.textContent = textsBottom[currentIndexBottom];
        currentIndexBottom = (currentIndexBottom + 1) % colors.length;
    }, 2000);
}
changeBottomBoxColor();


// api codes
formElem.addEventListener("submit", (e) => {
    e.preventDefault()
    let user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    }
    fetch("https://firstfirebaseproject-ecc0a-default-rtdb.firebaseio.com/users.json", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => {
            console.log(res);
            clearInputs()
        })
        .catch(err => console.log(err))
})
function clearInputs() {
    nameInput.value = ""
    emailInput.value = ""
    passwordInput.value = ""
}