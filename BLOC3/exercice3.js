 function validerFormulaire() {
      // Récupérer les valeurs
      let nom         = document.getElementById("nom").value.trim();
      let age         = document.getElementById("age").value;
      let sexe        = document.querySelector('input[name="sexe"]:checked');
      let loisir      = document.querySelector('input[name="loisir"]:checked');
      let pays        = document.getElementById("pays").value;
      let commentaire = document.getElementById("commentaire").value.trim();
      // Cacher toutes les erreurs d'abord
      document.querySelectorAll(".erreur").forEach(function(e) {
        e.style.display = "none";
      });

      // Variable pour savoir si le formulaire est valide
      let valide = true;

      // Vérification nom
      if (nom === "") {
        document.getElementById("erreur-nom").style.display = "block";
        valide = false;
      }

      // Vérification age
      if (age === "" || age <= 0) {
        document.getElementById("erreur-age").style.display = "block";
        valide = false;
      }

      // Vérification sexe
      if (!sexe) {
        document.getElementById("erreur-sexe").style.display = "block";
        valide = false;
      }

      // Vérification loisir
      if (!loisir) {
        document.getElementById("erreur-loisir").style.display = "block";
        valide = false;
      }

      // Vérification pays
      if (pays === "") {
        document.getElementById("erreur-pays").style.display = "block";
        valide = false;
      }

      // Vérification commentaire
      if (commentaire === "") {
        document.getElementById("erreur-commentaire").style.display = "block";
        valide = false;
      }

      // Si tout est valide — afficher les données
      if (valide) {
        document.getElementById("affiche-nom").textContent         = nom;
        document.getElementById("affiche-age").textContent         = age;
        document.getElementById("affiche-sexe").textContent        = sexe.value;
        document.getElementById("affiche-loisir").textContent      = loisir.value;
        document.getElementById("affiche-pays").textContent        = pays;
        document.getElementById("affiche-commentaire").textContent = commentaire;

        document.getElementById("resultat").style.display = "block";
      }
    }