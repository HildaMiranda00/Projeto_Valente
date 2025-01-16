document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.querySelector(".splash-screen");
  
    // Exibir a Splash Screen por 3 segundos e redirecionar para home.html
    setTimeout(() => {
      window.location.href = "home.html";
    }, 3000);
  });