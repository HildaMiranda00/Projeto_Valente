document
  .getElementById("cadastro-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const cnpj = document.getElementById("cnpj").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;
    const aceitaTermos = document.getElementById("aceita-termos").checked;
    const erro = document.getElementById("erro-cadastro");

    // Limpa erro anterior
    erro.textContent = "";

    // Validações individuais
    if (!nome) {
      erro.textContent = "O nome da instituição é obrigatório.";
      return;
    }

    if (!/^\d{14}$/.test(cnpj)) {
      erro.textContent = "O CNPJ deve conter exatamente 14 números.";
      return;
    }

    if (!email.includes("@")) {
      erro.textContent = "Informe um e-mail válido.";
      return;
    }

    if (!/^\d+$/.test(telefone)) {
      erro.textContent = "O telefone deve conter apenas números.";
      return;
    }

    const senhaValida =
      /[A-Za-z]/.test(senha) &&
      /[0-9]/.test(senha) &&
      /[^A-Za-z0-9]/.test(senha);
    if (senha.length < 8 || !senhaValida) {
      erro.textContent =
        "A senha deve ter pelo menos 8 caracteres, incluindo letras, números e símbolos.";
      return;
    }

    if (senha !== confirmarSenha) {
      erro.textContent = "As senhas não coincidem.";
      return;
    }

    if (!aceitaTermos) {
      erro.textContent = "Você deve aceitar os termos de uso.";
      return;
    }

    // Armazenamento
    const dados = JSON.parse(localStorage.getItem("ongs")) || [];
    dados.push({ nome, cnpj, email, telefone, senha });
    localStorage.setItem("ongs", JSON.stringify(dados));

    alert("Cadastro realizado com sucesso!");
    document.getElementById("cadastro-form").reset();
    erro.textContent = "";
  });

function toggleSenha(idCampo, iconeImg) {
  const campo = document.getElementById(idCampo);
  const mostrando = campo.type === "text";

  campo.type = mostrando ? "password" : "text";
  iconeImg.src = mostrando ? "img/eye-off.svg" : "img/eye.svg";
  iconeImg.alt = mostrando ? "Ocultar senha" : "Mostrar senha";
}
