document
  .getElementById("recuperar-senha")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const cnpj = prompt("Digite o CNPJ cadastrado (somente números):");

    if (!cnpj || !/^\d{14}$/.test(cnpj)) {
      alert("CNPJ inválido. Deve conter exatamente 14 números.");
      return;
    }

    const dados = JSON.parse(localStorage.getItem("ongs")) || [];
    const ong = dados.find((org) => org.cnpj === cnpj);

    if (!ong) {
      alert("CNPJ não encontrado. Verifique se a instituição foi cadastrada.");
      return;
    }

    // Simulando envio de e-mail
    alert(
      "Um e-mail de recuperação de senha foi enviado para: " +
        ong.email +
        "\n\nCaso não tenha mais acesso ao e-mail, entre em contato com o suporte."
    );

    // Simula o link de redefinição
    const desejaRedefinir = confirm("Simular redefinição de senha agora?");

    if (desejaRedefinir) {
      const novaSenha = prompt(
        "Digite a nova senha (máximo 8 caracteres, incluindo letras, números e símbolos):"
      );

      const senhaValida =
        novaSenha &&
        novaSenha.length <= 8 &&
        /[A-Za-z]/.test(novaSenha) &&
        /[0-9]/.test(novaSenha) &&
        /[^A-Za-z0-9]/.test(novaSenha);

      if (!senhaValida) {
        alert(
          "Senha inválida. A senha deve ter até 8 caracteres e conter letras, números e símbolos."
        );
        return;
      }

      ong.senha = novaSenha;
      localStorage.setItem("ongs", JSON.stringify(dados));
      alert("Senha redefinida com sucesso!");
    }
  });
