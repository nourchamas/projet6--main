// Récupérer le bouton de fermeture de la modale 2

let boutonFermer = document.querySelector("#modal2 .close");

// Ajouter un gestionnaire d'événements au clic sur le bouton de fermeture

if (boutonFermer) {
  boutonFermer.addEventListener("click", fermerModale2);
}


let inputImage = document.getElementById("imageUrl");
const titleimage = document.getElementById("selectorTitle");
const categoryimage = document.getElementById("selectorCategory");
const keytoken = localStorage.getItem("token");

inputImage.addEventListener("change", function () {
  let file = inputImage.files[0];

  document.querySelector(".apercuImg").style.display = "flex";
  document.querySelector(".mountaincontainer").style.display = "none";
  document.querySelector(".apercuImg img").src =
    window.URL.createObjectURL(file);
});

titleimage.addEventListener("input", function () {
  checkelements();
});

//  pour valider l'ajout de la photo (fonction)

 async function validerAjoutPhoto() {
 

const formulaire = document.getElementById("ajouterPhotoBtnModal2");
  const data = new FormData(formulaire);
console.log(keytoken);
 await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { Authorization: `Bearer ${keytoken}` },

    body: data,
  })
  .then((response) => {
      if (!response.ok) {
        throw new Error("l'ajout du travail a échoué");
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'ajout du travail:", error);
    });

    
} //pour ouvrir la modale 2 Fonction 

document
  .getElementById("ajouterPhotoBtnModal2")
  .addEventListener("submit", (event) =>{
  event.preventDefault();
  if (!checkelements()) {
    alert("veullez remplir tous les champs !!!");
  }else{
    validerAjoutPhoto();
  }
});
function checkelements() {
  if (
    inputImage.value != "" &&
    titleimage.value != "" &&
    categoryimage.value != ""
  ) {
    const buttonvalidation = document.getElementById("validate");
    buttonvalidation.style.backgroundColor = " #1D6154";
    return true;
  } else {
    return false;
  }
}

/// Sélectionnez la flèche de retour

const modale2head = document.querySelector(".modale2-head");

document.addEventListener("DOMContentLoaded", function () {
  // Récupérer la flèche pour revenir à la modale précédente

  let backArrow = document.querySelector(".fa-arrow-left");

  // Ajouter un gestionnaire d'événements au clic sur la flèche

  if (backArrow) {
    backArrow.addEventListener("click", function () {
      fermerModale2(); // Fermer la modale 2

      ouvrirModale1(); // Ouvrir la modale 1
    });
  }

  // Function to close modal 2

  function fermerModale2() {
    const modale2 = document.getElementById("modale2");

    modale2.style.display = "none";
  }

  // Ajouter un gestionnaire d'événements pour le clic sur la croix

  const closeButton = document.querySelector(".close");

  closeButton.addEventListener("click", function () {
    fermerModale2(); // Appeler la fonction pour fermer la modale 1
  });
});
