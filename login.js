function login() {
    const usrnm = document.querySelector("#username-slot");
    localStorage.setItem("username", usrnm.value);
    const psswrd = document.querySelector("#password-slot");
    localStorage.setItem("password", psswrd);
    window.location.href = "events.html";
}