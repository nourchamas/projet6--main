const premiereModale = document.getElementById("modale1");
// Sélection du bouton pour ouvrir la première modale
const ouvrirPremiereModaleBtn = document.getElementById("modifierBtn");
// Sélection du bouton pour fermer la première modale
const fermerPremiereModaleBtn = document.querySelector(".js-modale-close");

// Fonction pour ouvrir la première modale
function ouvrirPremiereModale() {
  premiereModale.style.display = " flex "; // Affiche la première modale
}

// Fonction pour fermer la première modale
function fermerPremiereModale() {
  premiereModale.style.display = "none"; // Masque la première modale
}

// Événement pour ouvrir la première modale lorsque le bouton est cliqué
if (ouvrirPremiereModaleBtn) {
  ouvrirPremiereModaleBtn.addEventListener("click", ouvrirPremiereModale);
}

// Événement pour fermer la première modale lorsque le bouton de fermeture est cliqué
if (fermerPremiereModaleBtn) {
  fermerPremiereModaleBtn.addEventListener("click", fermerPremiereModale);
}

// Sélection de la galerie dans la modale
const imageGallery = premiereModale.querySelector(".gallery");

// Fonction pour afficher les images dans la galerie photo
function afficherImagesDansGalerie(images) {
  images.forEach((image) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const icon = document.createElement("i");
    icon.className = "fa-regular fa-trash-can delete-work";
    icon.dataset.img = image.id;
    img.src = image.imageUrl;
    img.alt = image.title;
    figure.appendChild(img);
    figure.appendChild(icon);
    imageGallery.appendChild(figure);
  });
}

const worksApiUrl1 = "http://localhost:5678/api/works";
// Fetch works
async function fetchworks(worksApiUrl1) {
  await fetch(worksApiUrl1)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur de réseau");
      }
      return response.json();
    })
    .then((images) => {
      afficherImagesDansGalerie(images);
    })
    .catch((error) => {
      console.error("Erreur de récupération des images: " + error);
    });
}
fetchworks(worksApiUrl1);

/*croix x fermer modale 1*/
// Récupérer l'élément de la croix
var closeButton = document.querySelector(".gallery-view .close");

// Ajouter un gestionnaire d'événements pour le clic sur la croix
closeButton.addEventListener("click", function () {
  fermerModale1(); // Appeler la fonction pour fermer la modale 1
});

/*click sur button ajouter une photo modale1*/

// Fonction pour fermer la modale 1
function fermerModale1() {
  let modale1 = document.getElementById("modale1");
  modale1.style.display = "none";
}
function ouvrirModale2() {
  let modale2 = document.getElementById("modale2");

  modale2.style.display = "block";
}
// Récupérer le bouton "Ajouter une photo"
let ajouterPhotoBtn = document.getElementById("ajouterPhotoBtn");

// Événement de clic sur le bouton "Ajouter une photo"
ajouterPhotoBtn.addEventListener("click", function (e) {
  e.preventDefault();
  fermerModale1(); // Ferme la première modale
  ouvrirModale2(); // Ouvre la deuxième modale
});

// Function to open modal 1
function ouvrirModale1() {
  const modale1 = document.getElementById("modale1");
  modale1.style.display = "block";
}

// Fonction pour supprimer un travail

async function deleteWork(id, token) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      window.alert("Projet supprimé avec succès");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du projet :", error);
  }
}

// Fonction pour supprimer un travail du DOM
function removeWorkFromDOM(workId) {
  const workElement = document.querySelector(`[data-work-id="${workId}"]`);
  if (workElement) {
    workElement.parentNode.removeChild(workElement);
  }
}

const deleteButt = premiereModale.get("i");

console.log(deleteButt);

// Ajoutez un écouteur d'événement à chaque bouton de suppression
deleteButtons.forEach(function (button) {
  const token = localStorage.getItem("token");
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const workId = button.getAttribute("delete-work");
    console.log(event.target);
    deleteWork(workId, token);
  });
});
