 function ajouterElement() {

      // 1. Lire ce que l'utilisateur a écrit
      let valeur = document.getElementById("monInput").value.trim();

      // 2. Vérifier que le champ n'est pas vide
      if (valeur === "") {
        alert("Écris quelque chose d'abord !");
        return;
      }

      // 3. Créer un nouvel élément <li>
      let nouvelElement = document.createElement("li");

      // 4. Mettre le texte dans le <li>
      nouvelElement.textContent = valeur;

      // 5. Ajouter le <li> dans la liste <ul>
      document.getElementById("maListe").appendChild(nouvelElement);

      // 6. Vider le champ après ajout
      document.getElementById("monInput").value = "";
    }