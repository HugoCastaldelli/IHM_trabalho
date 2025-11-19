(function preloadUser() {
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    const defaultEmail = "rogerio@gmail.com";

    if (!users[defaultEmail]) {
        users[defaultEmail] = {
            nome: "Rogerio",
            senha: "roger"
        };

        localStorage.setItem("users", JSON.stringify(users));
        console.log("Usuário padrão 'Rogerio' criado.");
    }
})();



function login() {
    const entrada = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    const entradaLower = entrada.toLowerCase();

    if (users[entrada] && users[entrada].senha === senha) {
        window.location.href = "loading.html";
        return;
    }

    for (const email in users) {
        const user = users[email];

        if (user.nome.toLowerCase() === entradaLower && user.senha === senha) {
            window.location.href = "loading.html";
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
