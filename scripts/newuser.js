function login() {
    const entrada = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    const entradaLower = entrada.toLowerCase();

    if (users[entrada] && users[entrada].senha === senha) {
        alert("Login efetuado!");
        window.location.href = "home.html";
        return;
    }

    for (const email in users) {
        const user = users[email];

        if (user.nome.toLowerCase() === entradaLower && user.senha === senha) {
            alert("Login efetuado!");
            window.location.href = "home.html";
            return;
        }
    }

    alert("Usuário ou senha incorretos.");
}

function social(provider) {
    const tempPassword = Math.random().toString(36).substring(2, 10);
    localStorage.setItem("tempSocialPass", tempPassword);
    window.location.href = "newuser.html";
}
