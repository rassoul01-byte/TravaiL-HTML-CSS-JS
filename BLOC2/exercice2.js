let carte = document.getElementById("carte");
      let bouton = document.getElementById("bouton");

      carte.addEventListener("mouseover", function() {
        carte.style.backgroundColor = "lightblue";
      });

      bouton.addEventListener("click", function() {
        alert("Tu as cliqué !");
      })