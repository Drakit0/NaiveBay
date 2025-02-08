const users = {
    "test": "test",
};

document.addEventListener("DOMContentLoaded",()=>
    {document.getElementById("login__form").addEventListener("submit", (event) => {
        event.preventDefault();

        const form = event.target;
        const formInfo = new FormData(form);
        const inputUsername = formInfo.get("Username");
        const inputPassword = formInfo.get("Password");
        const messageElement = document.getElementById("password-message");

        messageElement.textContent = "";

        if (inputUsername in users) {
            if (inputPassword === users[inputUsername]) {
                localStorage.setItem("user", inputUsername);
                localStorage.setItem("isLoggedIn", true);
                location.href = "../index.html";
            } 
            else {
                messageElement.textContent = "The password is incorrect";
            }
        } 
        else {
            messageElement.textContent = "This user doesn't exist";
        }
})});
