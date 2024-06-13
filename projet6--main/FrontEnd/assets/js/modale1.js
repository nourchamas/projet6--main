


/*document.addEventListener('DOMContentLoaded', function() {*/
    // Sélection de la première modale
   
   
    const premiereModale = document.getElementById('modale1');

    // Sélection du bouton pour ouvrir la première modale
    const ouvrirPremiereModaleBtn = document.getElementById('modifierBtn');

    // Sélection du bouton pour fermer la première modale
    const fermerPremiereModaleBtn = document.querySelector('.js-modale-close');

    // Fonction pour ouvrir la première modale
    function ouvrirPremiereModale() {
        premiereModale.style.display = 'flex'; // Affiche la première modale
    }

    // Fonction pour fermer la première modale
    function fermerPremiereModale() {
        premiereModale.style.display = 'none'; // Masque la première modale
    }

    // Événement pour ouvrir la première modale lorsque le bouton est cliqué
    if (ouvrirPremiereModaleBtn) {
        ouvrirPremiereModaleBtn.addEventListener('click', ouvrirPremiereModale);
    }

    // Événement pour fermer la première modale lorsque le bouton de fermeture est cliqué
    if (fermerPremiereModaleBtn) {
        fermerPremiereModaleBtn.addEventListener('click', fermerPremiereModale);
    }






    
    // Sélection de la galerie dans la modale
    const imageGallery = premiereModale.querySelector('.gallery');

    // Fonction pour afficher les images dans la galerie photo
    function afficherImagesDansGalerie(images) {
        images.forEach((image) => {
          const figure = document.createElement("figure");
          const img = document.createElement("img");
          const icon=document.createElement("i");
          icon.className= "fa-regular fa-trash-can";
         
          img.src = image.imageUrl;
          img.alt = image.title;
          figure.appendChild(img);
          figure.appendChild(icon);
          imageGallery.appendChild(figure);

icon.addEventListener("click",function (){
deleteWork(image.id);
console.log( image.id);

});

        });
        
    }

    
    const worksApiUrl1 = "http://localhost:5678/api/works"; 
// Fetch works
fetch(worksApiUrl1)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur de réseau");
    }
    return response.json();
  })
  .then((images) => {
   afficherImagesDansGalerie(images);
  })
  .catch((error)=> {
    console.error("Erreur de récupération des images: " + error);
  });

   

/*croix x fermer modale 1*/
// Récupérer l'élément de la croix
var closeButton = document.querySelector(".gallery-view .close");

// Ajouter un gestionnaire d'événements pour le clic sur la croix
closeButton.addEventListener("click", function() {
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
ajouterPhotoBtn.addEventListener('click', function() {
    fermerModale1(); // Ferme la première modale
    ouvrirModale2(); // Ouvre la deuxième modale
});

// Function to open modal 1
function ouvrirModale1() {
    const modale1 = document.getElementById("modale1");
    modale1.style.display = "block";
}


// Fonction pour supprimer un travail
function deleteWork(workId) {
    fetch("http://localhost:5678/api/works/"+ workId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
"Authorization":"Bearer " +localStorage.getItem("token")
            // Ajoutez d'autres en-têtes si nécessaire
        },
        // Ajoutez un corps de demande si nécessaire
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La suppression du travail a échoué');
        }
        // Actualiser le DOM ou effectuer d'autres actions après la suppression réussie
    })
    .catch(error => {
        console.error('Erreur lors de la suppression du travail:', error);
    });
  }