function login() {
    const usrnm = document.querySelector("#username");
    localStorage.setItem("username", usrnm.value);
    window.location.href = "events.html";
}