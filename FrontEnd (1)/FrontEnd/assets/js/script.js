const API = "http://localhost:5678/api";
const USER_TOKEN = localStorage.getItem("token");

const displayCategories = async () => {
  const filters = document.querySelector(".filters-container");
  const response = await fetch(API + "/categories");

  let categories = await response.json();

  setFilterListener(document.querySelector(".filter"));

  const select = document.getElementById("category");
  for (category of categories) {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.className = "filter";
    filters.appendChild(button);
    setFilterListener(button);

    let option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  }
};

const setFilterListener = async (targetFilter) => {
  targetFilter.addEventListener("click", () => {
    const filters = document.getElementsByClassName("filter");
    for (let filter of filters) {
      if (filter.className.includes("filter-active")) {
        filter.classList.remove("filter-active");
      }
    }
    targetFilter.classList.add("filter-active");
    filterByCategory(targetFilter.textContent);
  });
};

const displayWorks = async () => {
  const response = await fetch(API + "/works");
  const works = await response.json();
  const gallery = document.querySelector(".gallery");
  const galleryModal = document.querySelector(".modal-works");
  gallery.innerHTML = ""; //Reset gallery

  for (let work of works) {
    const figure = document.createElement("figure");
    figure.setAttribute("category", work.category.name);
    figure.dataset.workid = work.id;
    figure.classList.add("work");

    const img = document.createElement("img");
    img.alt = work.title;
    img.src = work.imageUrl;
    // Need to create a deep copy to put in modal window
    const imgCopy = img.cloneNode(true);

    const figureCopy = figure.cloneNode(true);

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    setDeleteWorkListener(deleteButton);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash-can";
    deleteButton.appendChild(deleteIcon);

    figureCopy.appendChild(imgCopy);
    figureCopy.appendChild(deleteButton);
    galleryModal.appendChild(figureCopy);
  }
};

const setDeleteWorkListener = (button) => {
  button.addEventListener("click", async () => {
    const parentFigure = button.parentElement;

    const workId = parentFigure.dataset.workid;

    const deleteResponse = await fetch(API + "/works/" + workId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + USER_TOKEN,
      },
    });

    switch (deleteResponse.status) {
      case 204:
        const worksToDelete = document.querySelectorAll(
          '[data-workid="' + workId + '"]'
        );

        for (let i = 0; i < worksToDelete.length; i++) {
          worksToDelete[i].remove();
        }
        break;

      default:
        console.log("Untreated status code:" + deleteResponse.status);
        break;
    }
  });
};

const filterByCategory = (category) => {
  const gallery = document.querySelector(".gallery");
  if (category === "Tous") {
    // Display all work example when "all" filter is on
    const inactiveWorks = document.querySelectorAll(".work.hidden");
    for (let i = 0; i < inactiveWorks.length; i++) {
      const work = inactiveWorks[i];
      work.classList.remove("hidden");
    }
  } else {
    for (let i = 0; i < gallery.children.length; i++) {
      const work = gallery.children[i];
      if (work.getAttribute("category") === category) {
        work.classList.remove("hidden");
      } else {
        work.classList.add("hidden");
      }
    }
  }
};

const checkIfLogged = () => {
  const siteUser = window.localStorage.getItem("token");

  if (siteUser === null) {
    return;
  }

  displaySettingMode();
};

const displaySettingMode = () => {
  const loginNav = document.querySelector('.nav-link[href="login.html"]');
  loginNav.innerHTML = "logout";
  loginNav.addEventListener("click", () => {
    localStorage.removeItem("token");
  });

  document.querySelector(".header").classList.add("setting-mode");
  document.querySelector(".setting-header").classList.remove("hidden");
  document.querySelector(".projects-title").style.marginBottom = "92px";
  document.querySelector(".filters-container").classList.add("hidden");
  document.querySelector(".modifier-projects").classList.remove("hidden");
};

const setModifierListener = () => {
  const modifierDiv = document.querySelector(".modifier-projects");

  modifierDiv.addEventListener("click", () => {
    document.querySelector(".modal-background").classList.remove("hidden");
    document.querySelector(".modal-gallery").classList.remove("hidden");
  });
};

const setCloseListeners = () => {
  const closeButtons = document.querySelectorAll(".close-button");
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", () => {
      document.querySelector(".modal-background").classList.add("hidden");
      document.querySelector(".modal-gallery").classList.add("hidden");
      document.querySelector(".modal-menu").classList.add("hidden");
      resetNewWorkForm();
    });
  }
};

const setReturnListener = () => {
  const returnButton = document.querySelector(".return-button");
  returnButton.addEventListener("click", () => {
    document.querySelector(".modal-gallery").classList.remove("hidden");
    document.querySelector(".modal-menu").classList.add("hidden");
    resetNewWorkForm();
  });
};

const setAddMenuListener = () => {
  const addPhotoButton = document.querySelector(".add-menu-button");
  addPhotoButton.addEventListener("click", () => {
    document.querySelector(".modal-gallery").classList.add("hidden");
    document.querySelector(".modal-menu").classList.remove("hidden");
  });
};

const setFileInputListener = () => {
  const inputButton = document.getElementById("image");
  inputButton.addEventListener("change", (event) => {
    const imageInput = document.querySelector(".image-input");
    const previewImage = document.querySelector(".preview-image");

    if (event.target.files.length > 0) {
      previewImage.src = URL.createObjectURL(event.target.files[0]);

      previewImage.classList.remove("hidden");
      imageInput.classList.add("hidden");
    }
  });
};

const resetNewWorkForm = () => {
  const newWorkForm = document.querySelector(".photo-details");
  const imageInput = document.querySelector(".image-input");
  const previewImage = document.querySelector(".preview-image");

  newWorkForm.reset();
  previewImage.src = "";

  previewImage.classList.add("hidden");
  imageInput.classList.remove("hidden");
  for (let errorMessage of document.querySelectorAll(".modal-error")) {
    errorMessage.classList.add("hidden");
  }
};

const setFormChangeListener = () => {
  const form = document.forms.namedItem("newWork");
  form.addEventListener("change", () => {
    const formData = new FormData(form);

    if (checkFormFilled(formData)) {
      document.querySelector(".validate-button").classList.remove("not-valid");
    } else {
      document.querySelector(".validate-button").classList.add("not-valid");
    }
  });
};

const checkFormFilled = (formData) => {
  if (formData.get("image") === null) {
    return false;
  }

  if (formData.get("title") === "") {
    return false;
  }

  if (formData.get("category") === "") {
    return false;
  }

  return true;
};

const displayErrorMessages = (formData) => {
  if (formData.get("image") === null) {
    document.getElementById("error-image").classList.remove("hidden");
  } else {
    document.getElementById("error-image").classList.add("hidden");
  }

  if (formData.get("title") === "") {
    document.getElementById("error-title").classList.remove("hidden");
  } else {
    document.getElementById("error-title").classList.add("hidden");
  }

  if (formData.get("category") === "") {
    document.getElementById("error-category").classList.remove("hidden");
  } else {
    document.getElementById("error-image").classList.add("hidden");
  }
};

const setSendWorkListener = async () => {
  document
    .querySelector(".validate-button")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      const form = document.getElementById("newWork");
      const formData = new FormData(form);

      if (!checkFormFilled(formData)) {
        displayErrorMessages(formData);
        return;
      }

      const sendResponse = await fetch(API + "/works", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + USER_TOKEN,
        },
        body: formData,
      });

      switch (sendResponse.status) {
        case 201:
          document.querySelector(".gallery").innerHTML = "";
          document.querySelector(".modal-works").innerHTML = "";
          displayWorks();
          resetNewWorkForm();
          document.querySelector(".modal-gallery").classList.remove("hidden");
          document.querySelector(".modal-menu").classList.add("hidden");
          return;

        default:
          console.log("Unexpected status code");
      }
    });
};

const configureModals = async () => {
  setModifierListener();
  setCloseListeners();
  setReturnListener();
  setAddMenuListener();
  setFileInputListener();
  setSendWorkListener();
  setFormChangeListener();
};

const init = () => {
  displayCategories();
  displayWorks();
  configureModals();
  const gallery = document.querySelector(".gallery");

  checkIfLogged();
};

init();
