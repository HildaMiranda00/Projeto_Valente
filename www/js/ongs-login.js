document.getElementById("login-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const cnpj = document.getElementById("login-cnpj").value.trim();
  const senha = document.getElementById("login-senha").value;
  const erro = document.getElementById("erro-login");

  /*
  if (!/^[0-9]{14}$/.test(cnpj)) {
    erro.textContent = "CNPJ inválido";
    return;
  }
*/

  try {
    const response = await fetch("https://backend-cool-forest-8585.fly.dev/management/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cnpj, senha }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.message === "Login realizado com sucesso!") {

        window.location.href = "/home.html"; 
      }
    } else {
      const data = await response.json();
      erro.textContent = data.error || "Erro desconhecido no login.";
    }
  } catch (err) {
    erro.textContent = "Erro ao se conectar ao servidor.";
    console.error(err);
  }
});
