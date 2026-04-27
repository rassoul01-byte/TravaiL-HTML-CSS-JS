// Sélectionner la carte et le bouton
let carte  = document.getElementById("maCarte");
let bouton = document.getElementById("monBouton");

// Au survol — changer la couleur de la carte
carte.addEventListener("mouseover", function() {
  carte.style.backgroundColor = "lightblue";
  carte.style.transform = "translateY(-5px)";
});

// Quand la souris quitte — remettre la couleur d'origine
carte.addEventListener("mouseout", function() {
  carte.style.backgroundColor = "white";
  carte.style.transform = "translateY(0)";
});

// Au clic sur le bouton — afficher un message
bouton.addEventListener("click", function() {
  alert("👋 Bonjour ! Je suis Khadija, étudiant en Ref Dig P8 !");
});