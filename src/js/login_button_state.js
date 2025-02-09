const setAppropriateLoginComponent = () => {
    const loginSpace = document.getElementById("main-page__login-container")
    const userData = JSON.parse(localStorage.getItem("user"));
    const currentPath = location.pathname;
    const isInsidePages = currentPath.includes("/pages/");
    const targetPathAssets = isInsidePages ? "" : "../";
    const targetPath = isInsidePages ? "" : "pages/";
    if (userData){
        loginSpace.innerHTML = `
        <h3 class="text text__white">${userData.username}</h3>
        <a href="#">
            <img src="${targetPathAssets}assets/icons/user_icon.png" class="main-page__icon big-on-hover"/>
        </a>
        `;
    }
    else {
        loginSpace.innerHTML = `
        <a href="${targetPath}login_page.html" class="button-text">
            <button class="button login-button " >Login</button>
        </a>
        <a href="${targetPath}register_page.html" class="nav-button-container button-text">
            <button class="button login-button ">Register</button>
        </a>
        `;
    }
}
document.addEventListener('DOMContentLoaded', setAppropriateLoginComponent) //If using load with window you get a NullReferenceException