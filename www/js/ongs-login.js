document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const cnpj = document.getElementById("login-cnpj").value;
  const senha = document.getElementById("login-senha").value;
  const erro = document.getElementById("erro-login");

  if (!/^[0-9]{14}$/.test(cnpj)) {
    erro.textContent = "CNPJ inválido";
    return;
  }

  const dados = JSON.parse(localStorage.getItem("ongs")) || [];
  const ong = dados.find((org) => org.cnpj === cnpj);

  if (!ong) {
    erro.textContent = "Empresa não cadastrada";
    return;
  }

  if (ong.senha !== senha) {
    erro.textContent = "Erro no login";
    return;
  }

  erro.textContent = "";
  alert("Login realizado com sucesso!");
  // Redirecionamento para a página de eventos
  window.location.href = "eventos-cadastro.html";
  document.getElementById("login-form").reset();
});
