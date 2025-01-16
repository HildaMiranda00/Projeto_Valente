var app = new Framework7({
  el: "#app",
  name: "My App",
  id: "com.myapp.test",
  routes: [
    { path: "/home/", url: "home.html", animate: false },
    { path: "/social/", url: "social.html", animate: false },
    { path: "/leis/", url: "leis.html", animate: false },
    { path: "/disque/", url: "disque.html", animate: false },
    { path: "/eventos/", url: "eventos.html", animate: false },
    { path: "/chatbot/", url: "chatbot.html", animate: false },
  ],
});

// Criar visualização principal
var mainView = app.views.create(".view-main", {
  url: "/home/",
});