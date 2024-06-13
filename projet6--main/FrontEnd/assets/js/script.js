

let dataImage = [];
let listCategories = [];

// Replace this with the actual endpoint of the provided backend API
const worksApiUrl = "http://localhost:5678/api/works";
const categoriesApiUrl = "http://localhost:5678/api/categories";

// Reset la section projets
function resetSectionProjets() {
  const imageGallery = document.querySelector(".gallery");
  imageGallery.innerHTML = "";
}

// Fetch works
fetch(worksApiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur de réseau");
    }
    return response.json();
  })
  .then((images) => {
    dataImage = images;
  
    showWorks(dataImage);
  })
  .catch((error) => {
    console.error("Erreur de récupération des images: " + error);
  });

// Fetch categories
fetch(categoriesApiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur de réseau");
    }
    return response.json();
  })
  .then((categories) => {
    listCategories = categories;
    createCategories(categories);
  })
  .catch((error) => {
    console.error("Error fetching categories:", + error);
  });

// Show works
function showWorks(images) {
  const imageGallery = document.querySelector(".gallery");
  resetSectionProjets();
  images.forEach((image) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = image.imageUrl;
    img.alt = image.title;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = image.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    imageGallery.appendChild(figure);
  });
  
}

// Filter works by category
function filterWorksByCategory(categoryId) {
  const filteredImages = dataImage.filter((image) => image.categoryId === categoryId);
  showWorks(filteredImages);
}

// Create category filters
function createCategories(categories) {
  const categoryContainer = document.querySelector(".filters");

  categories.forEach((category) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.classList.add("filter__btn");
    categoryBtn.textContent = category.name;
    categoryBtn.dataset.categoryId = category.id;
let option=document.createElement("option");
option.setAttribute("value",category.id);
option.textContent=category.name;
console.log(option);

const selectcategory = document.getElementById("selectorCategory");
selectcategory.appendChild(option);
    categoryBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementsByClassName("filter__btn--active" )[0].classList.remove("filter__btn--active");

      e.target.classList.add("filter__btn--active");
      const categoryId = parseInt(categoryBtn.dataset.categoryId);
      filterWorksByCategory(categoryId);
    });

    categoryContainer.appendChild(categoryBtn);
  });
const btn_tous= document.querySelector(".filter__btn");
  btn_tous.addEventListener("click",(e)=>{
    e.preventDefault();
 
 document.getElementsByClassName("filter__btn--active" )[0].classList.remove("filter__btn--active");
 e.target.classList.add("filter__btn--active");
showWorks(dataImage);

  });


}







// Fonction pour supprimer un travail
function deleteWork(workId) {
  fetch("http://localhost:5678/api/works/1", {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
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

document.addEventListener("DOMContentLoaded", function() {
  // Sélectionnez tous les boutons de suppression
  const deleteButtons = document.querySelectorAll(".delete-work");

  // Fonction pour supprimer un travail du DOM
  function removeWorkFromDOM(workId) {
      const workElement = document.querySelector(`[data-work-id="${workId}"]`);
      if (workElement) {
          workElement.parentNode.removeChild(workElement);
      }
  }

  // Ajoutez un écouteur d'événement à chaque bouton de suppression
  deleteButtons.forEach(function(button) {
      button.addEventListener("click", function(event) {
          event.preventDefault();
          const workId = button.getAttribute("delete-work");

          deleteWork(workId);
        });
    });
});





const token=localStorage.getItem("token");

if (token){
document.querySelector(".filters").style.display="none";
  document.querySelector(".admin__modifer").style.display="flex";
  document.getElementById("barre").style.display="flex";
  document.querySelector(".btnlogin").style.display="none";
 
  document.querySelector(".btnlogout").style.display="block";
  document.querySelector(".btnlogout").addEventListener("click",(e)=>{
   
    localStorage.removeItem("token");}



  )};
 
  
  
 