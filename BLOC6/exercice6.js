
    // ═══════════════════════════════════════════
// DONNÉES — chargées depuis le localStorage
// ═══════════════════════════════════════════

let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
let taches       = JSON.parse(localStorage.getItem("taches"))       || [];

// ═══════════════════════════════════════════
// SAUVEGARDE localStorage
// ═══════════════════════════════════════════

function sauvegarder() {
  localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
  localStorage.setItem("taches",       JSON.stringify(taches));
}

// ═══════════════════════════════════════════
// GÉNÉRER UN ID UNIQUE
// ═══════════════════════════════════════════

function generId() {
  return Date.now().toString();
}

// ═══════════════════════════════════════════
// UTILISATEURS
// ═══════════════════════════════════════════

function ajouterUtilisateur() {
  let nom = document.getElementById("input-user").value.trim();

  if (nom === "") {
    alert("Veuillez entrer un nom !");
    return;
  }

  let user = {
    id: generId(),
    nom: nom,
    archive: false
  };

  utilisateurs.push(user);
  sauvegarder();
  document.getElementById("input-user").value = "";
  afficherUtilisateurs();
  mettreAJourSelects();
}

function afficherUtilisateurs() {
  let conteneur = document.getElementById("liste-utilisateurs");
  conteneur.innerHTML = "";

  if (utilisateurs.length === 0) {
    conteneur.innerHTML = '<div class="vide">Aucun utilisateur ajouté.</div>';
    return;
  }

  utilisateurs.forEach(function(user) {
    let initiale = user.nom.charAt(0).toUpperCase();

    let div = document.createElement("div");
    div.className = "user-item" + (user.archive ? " archive" : "");
    div.innerHTML = `
      <div class="user-info">
        <div class="avatar">${initiale}</div>
        <div>
          <div class="user-name">${user.nom}</div>
          ${user.archive ? '<span class="badge-archive">Archivé</span>' : ''}
        </div>
      </div>
      <div class="user-actions">
        ${!user.archive ? `<button class="btn btn-edit" onclick="ouvrirModal('${user.id}', '${user.nom}')">✏️ Modifier</button>` : ''}
        <button class="btn btn-archive" onclick="archiverUtilisateur('${user.id}')">
          ${user.archive ? '♻️ Restaurer' : '📦 Archiver'}
        </button>
      </div>
    `;
    conteneur.appendChild(div);
  });
}

function archiverUtilisateur(id) {
  let user = utilisateurs.find(u => u.id === id);
  if (user) {
    user.archive = !user.archive;
    sauvegarder();
    afficherUtilisateurs();
    mettreAJourSelects();
  }
}

// ═══════════════════════════════════════════
// MODAL MODIFIER
// ═══════════════════════════════════════════

function ouvrirModal(id, nom) {
  document.getElementById("modal-input").value = nom;
  document.getElementById("modal-id").value = id;
  document.getElementById("modal-edit").classList.add("active");
}

function fermerModal() {
  document.getElementById("modal-edit").classList.remove("active");
}

function sauvegarderModif() {
  let id      = document.getElementById("modal-id").value;
  let nouveau = document.getElementById("modal-input").value.trim();

  if (nouveau === "") {
    alert("Le nom ne peut pas être vide !");
    return;
  }

  let user = utilisateurs.find(u => u.id === id);
  if (user) {
    user.nom = nouveau;
    // Mettre à jour le nom dans les tâches aussi
    taches.forEach(function(t) {
      if (t.userId === id) t.userName = nouveau;
    });
    sauvegarder();
    afficherUtilisateurs();
    afficherTaches();
    mettreAJourSelects();
  }

  fermerModal();
}

// ═══════════════════════════════════════════
// TÂCHES
// ═══════════════════════════════════════════

function ajouterTache() {
  let titre    = document.getElementById("input-tache").value.trim();
  let select   = document.getElementById("select-user-tache");
  let userId   = select.value;
  let userName = select.options[select.selectedIndex].text;

  if (titre === "") {
    alert("Veuillez entrer une tâche !");
    return;
  }

  let tache = {
    id: generId(),
    titre: titre,
    userId: userId,
    userName: userId ? userName : "Non assignée",
    terminee: false
  };

  taches.push(tache);
  sauvegarder();
  document.getElementById("input-tache").value = "";
  afficherTaches();
  mettreAJourStats();
}

function afficherTaches() {
  let conteneur = document.getElementById("liste-taches");
  let filtreId  = document.getElementById("filtre-user").value;

  conteneur.innerHTML = "";

  let tachesFiltrees = filtreId !== ""
    ? taches.filter(t => t.userId === filtreId)
    : taches;

  if (tachesFiltrees.length === 0) {
    conteneur.innerHTML = '<div class="vide">Aucune tâche trouvée.</div>';
    mettreAJourStats();
    return;
  }

  tachesFiltrees.forEach(function(tache) {
    let div = document.createElement("div");
    div.className = "tache-item" + (tache.terminee ? " terminee" : "");
    div.innerHTML = `
      <div class="tache-info">
        <div class="tache-titre">${tache.titre}</div>
        <span class="tache-user">👤 ${tache.userName}</span>
      </div>
      <div class="tache-actions">
        <button class="btn btn-done" onclick="toggleTerminee('${tache.id}')">
          ${tache.terminee ? '↩️ Reprendre' : '✅ Terminer'}
        </button>
        <button class="btn btn-delete" onclick="supprimerTache('${tache.id}')">🗑️ Supprimer</button>
      </div>
    `;
    conteneur.appendChild(div);
  });

  mettreAJourStats();
}

function toggleTerminee(id) {
  let tache = taches.find(t => t.id === id);
  if (tache) {
    tache.terminee = !tache.terminee;
    sauvegarder();
    afficherTaches();
  }
}

function supprimerTache(id) {
  if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
    taches = taches.filter(t => t.id !== id);
    sauvegarder();
    afficherTaches();
  }
}

// ═══════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════

function mettreAJourStats() {
  let total     = taches.length;
  let terminees = taches.filter(t => t.terminee).length;
  let restantes = total - terminees;

  document.getElementById("stat-total").textContent     = total;
  document.getElementById("stat-terminees").textContent = terminees;
  document.getElementById("stat-restantes").textContent = restantes;
}

// ═══════════════════════════════════════════
// METTRE À JOUR LES SELECTS
// ═══════════════════════════════════════════

function mettreAJourSelects() {
  let actifs = utilisateurs.filter(u => !u.archive);

  // Select pour affecter une tâche
  let selectTache = document.getElementById("select-user-tache");
  selectTache.innerHTML = '<option value="">-- Utilisateur --</option>';
  actifs.forEach(function(user) {
    selectTache.innerHTML += `<option value="${user.id}">${user.nom}</option>`;
  });

  // Select filtre
  let filtre = document.getElementById("filtre-user");
  filtre.innerHTML = '<option value="">🔍 Toutes les tâches</option>';
  actifs.forEach(function(user) {
    filtre.innerHTML += `<option value="${user.id}">${user.nom}</option>`;
  });
}

// ═══════════════════════════════════════════
// INITIALISATION AU CHARGEMENT
// ═══════════════════════════════════════════

afficherUtilisateurs();
mettreAJourSelects();
afficherTaches();
mettreAJourStats();