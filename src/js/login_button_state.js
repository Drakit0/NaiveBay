const setAppropriateLoginComponent = () => {
    const loginSpace = document.getElementById("main-page__login-container")
    const userData = JSON.parse(localStorage.getItem("user"));
    const baseURL = location.origin;
    if (userData){
        loginSpace.innerHTML = `
        <h3 class="text text__white">${userData.username}</h3>
        <a href="#">
            <img src="${baseURL}/src/assets/icons/user_icon.png" class="main-page__icon big-on-hover"/>
        </a>
        `;
    }
    else {
        loginSpace.innerHTML = `
        <a href="${baseURL}/src/pages/login_page.html" class="button-text">
            <button class="button login-button " >Login</button>
        </a>
        <a href="${baseURL}/src/pages/register_page.html" class="nav-button-container button-text">
            <button class="button login-button ">Register</button>
        </a>
        `;
    }
}
document.addEventListener('DOMContentLoaded', setAppropriateLoginComponent) //If using load with window you get a NullReferenceException