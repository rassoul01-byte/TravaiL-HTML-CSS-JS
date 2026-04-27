
  

    function changerTheme() {
      // Alterner la classe sombre sur le body
      document.body.classList.toggle("sombre");

      // Changer le texte du bouton
      let bouton = document.getElementById("monBouton");

      if (document.body.classList.contains("sombre")) {
        bouton.textContent = "☀️ Mode Clair";
      } else {
        bouton.textContent = "🌙 Mode Sombre";
      }
    }
  