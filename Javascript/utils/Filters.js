// Import des modules nécessaires
import { filtersQueries, getRecipesElements } from "./filterQueries.js";
import { renderTag } from "../View/renderTagUI.js";
import { manageTags } from "./tagInput.js";
import { renderRecipes } from "../pages/index.js";
import { renderTotalRecipes } from "../pages/index.js";

// Déclaration des variables à l'extérieur de la fonction
let filterIngredientsDatas;
let filterAppliancesDatas;
let filterUstensilsDatas;
// Déclarez ceci en dehors de la fonction manageFilterList
let selectedItems = [];

/**
 * Gère les filtres en fonction de la liste des recettes (filtrées ou non)
 * @param {Array} filteredRecipes - Recettes filtrées
 */
const manageFilters = (filteredRecipes) => {
  // Filtres par tags
  const filterIngredientsButton = document.getElementById("filter-ingredients");
  const filterAppliancesButton = document.getElementById("filter-appliances");
  const filterUstensilsButton = document.getElementById("filter-ustensils");
  const filterIngredientsList = document.getElementById("ingredients-list");
  const filterAppliancesList = document.getElementById("appliances-list");
  const filterUstensilsList = document.getElementById("ustensils-list");

  // Initialisation des variables à l'intérieur de la fonction
  filterIngredientsDatas = getRecipesElements(filteredRecipes, "ingredients");
  filterAppliancesDatas = getRecipesElements(filteredRecipes, "appliances");
  filterUstensilsDatas = getRecipesElements(filteredRecipes, "ustensils");

  const filters = [
    {
      name: "ingredients",
      button: filterIngredientsButton,
      list: filterIngredientsList,
      datas: filterIngredientsDatas,
    },
    {
      name: "appliances",
      button: filterAppliancesButton,
      list: filterAppliancesList,
      datas: filterAppliancesDatas,
    },
    {
      name: "ustensils",
      button: filterUstensilsButton,
      list: filterUstensilsList,
      datas: filterUstensilsDatas,
    },
  ];

  const allListButtons = document.querySelectorAll(".filter__button");
  const allListDOM = document.querySelectorAll(".filter__list-container");
  // Tags (filtres sélectionnés)
  const tagsContainer = document.getElementById("tags");
  const tagsList = document.querySelector(".tags__list");
  let tagsListElement = [];
  let numberTags = 0;
  let filteredRecipesByTag = filteredRecipes;

  /**
   * Gère les données à afficher dans les filtres
   * lorsque l'utilisateur sélectionne un tag
   * @param {Array} recipesList - Liste des recettes
   */
  const changeFiltersDatas = (recipesList) => {
    const newFiltersDatas = [
      getRecipesElements(recipesList, "ingredients"),
      getRecipesElements(recipesList, "appliances"),
      getRecipesElements(recipesList, "ustensils"),
    ];

    filters.forEach((filter, index) => {
      filter.datas = newFiltersDatas[index];
      manageFilterList(filter);
    });
  };

  /**
   * Met à jour la vue des recettes, le nombre total de recettes trouvées et les données des filtres
   * @param {Array} recipesList - Liste des recettes
   */
  const updateDatas = (recipesList) => {
    renderRecipes(recipesList);
    renderTotalRecipes(recipesList);
    changeFiltersDatas(recipesList);
  };

  // Ajoutez une nouvelle fonction pour gérer la suppression de l'élément sélectionné
  const handleSelectedItemClick = (listElement, tag, filterName) => {
    listElement.classList.remove("selected");
    const crossElement = listElement.querySelector(".cross");
    crossElement.style.visibility = "hidden";
    removeTag(filterName, tag);
    manageSelectedItems(listElement, tag, filterName);
  };

  /**
   * Gère l'ouverture/fermeture de la liste des filtres et la classe pour les animations CSS
   * Ferme le filtre ouvert lorsque l'on ouvre un autre
   * @param {object} filter - Objet filtre
   */
  const toggleFilter = (filter) => {
    const ariaExpandedAttribute = filter.button.getAttribute("aria-expanded");
    if (ariaExpandedAttribute === "false") {
      closeAllFilters(allListButtons, allListDOM);
      // Ouvre le filtre sélectionné
      filter.list.classList.add("filter__list-container--open");
      filter.button.classList.add("filter--open");
      filter.button.setAttribute("aria-expanded", true);
      manageTags(filter, manageFilterList);
      manageFilterList(filter);
    } else {
      // Ferme le filtre sélectionné
      filter.list.classList.remove("filter__list-container--open");
      filter.list.classList.add("filter__list-container--close");
      filter.button.classList.remove("filter--open");
      filter.button.setAttribute("aria-expanded", false);
    }
  };

  /**
   * À l'ouverture, toutes les données des recettes filtrées sont affichées
   * @param {object} filter - Objet filtre
   */
  const manageFilterList = (filter) => {
    const filterList = document.getElementById(`${filter.name}-list-items`);
    filterList.innerHTML = "";

    filter.datas.forEach((tag) => {
      const listElement = document.createElement("li");
      listElement.setAttribute("role", "option");
      listElement.textContent = tag;
      filterList.appendChild(listElement);

      const crossElement = document.createElement("span");
      crossElement.className = "cross";
      crossElement.innerHTML = "&times;";
      listElement.appendChild(crossElement);

      // Ajouter un gestionnaire d'événements au clic sur un élément de la liste
      listElement.addEventListener("click", (event) => {
        listElement.classList.toggle("selected");
        crossElement.style.visibility = listElement.classList.contains(
          "selected"
        )
          ? "visible"
          : "hidden";
        manageSelectedItems(listElement, tag, filter.name);
        addTag(filter, tag);
        event.stopPropagation();
      });

      // Si l'élément est déjà sélectionné, appliquer le style
      if (
        selectedItems.some(
          (item) => item.tag === tag && item.filterName === filter.name
        )
      ) {
        listElement.classList.add("selected");
        crossElement.style.visibility = "visible";
      }
    });
  };

  // Ajoutez une fonction pour gérer les éléments sélectionnés
  const manageSelectedItems = (listElement, tag, filterName) => {
    const selectedItemIndex = selectedItems.findIndex(
      (item) => item.tag === tag && item.filterName === filterName
    );

    if (listElement.classList.contains("selected")) {
      if (selectedItemIndex === -1) {
        selectedItems.push({ tag, filterName });
      }
    } else {
      if (selectedItemIndex !== -1) {
        selectedItems.splice(selectedItemIndex, 1);
      }
    }
  };

  /**
   * Ajoute le tag sélectionné par l'utilisateur
   * @param {object} filter - Objet filtre
   * @param {string} tagName - Nom du tag
   */
  const addTag = (filter, tagName) => {
    if (tagsContainer.className === "tags") {
      tagsContainer.className = "tags--activate";
    }
    let duplicateTagsCount = 0;
    if (tagsListElement.length > 0) {
      for (let i = 0; i < tagsListElement.length; i++) {
        if (tagsListElement[i].tagName === tagName) {
          duplicateTagsCount++;
        }
      }
    }
    if (duplicateTagsCount === 0) {
      numberTags += 1;
      const filterName =
        filter.name === "appliances" ? "appliance" : filter.name;
      renderTag(tagName, tagsList, removeTag);
      tagsListElement.push({
        tagName: tagName,
        filterName: filterName,
      });
      filteredRecipesByTag = filtersQueries(filteredRecipesByTag, tagName, [
        filterName,
      ]);
      updateDatas(filteredRecipesByTag);
    }
    toggleFilter(filter);
  };

  /**
   * Supprime le tag lorsque l'utilisateur clique sur la croix du tag
   * Met à jour filterRecipesByTag uniquement avec les tags restants
   * @param {string} tagName - Nom du tag
   */
  const removeTag = (tagName) => {
    numberTags -= 1;
    const tagNameSelectedDOM = document.getElementById(
      `${tagName.split(" ").join("")}-selected`
    );
    tagNameSelectedDOM.remove();
    tagsListElement = tagsListElement.filter(
      (item) => item.tagName !== tagName
    );
    filteredRecipesByTag = filteredRecipes;
    tagsListElement.forEach((tag) => {
      filteredRecipesByTag = filtersQueries(filteredRecipesByTag, tag.tagName, [
        tag.filterName,
      ]);
    });
    updateDatas(filteredRecipesByTag);
    if (numberTags === 0) {
      tagsContainer.className = "tags";
      filteredRecipesByTag = filteredRecipes;
      updateDatas(filteredRecipes);
    }
  };

  /**
   * Supprime tous les tags lorsque l'utilisateur recherche une recette depuis la barre de recherche principale
   */
  const removeAllTags = () => {
    if (tagsListElement.length > 0) {
      tagsListElement.forEach((tag) => {
        const tagNameSelectedDOM = document.getElementById(
          `${tag.tagName.split(" ").join("")}-selected`
        );
        tagNameSelectedDOM.remove();
      });
      tagsContainer.className = "tags";
      // Tableau vide
      tagsListElement.splice(0, tagsListElement.length);
      updateDatas(allRecipes);
      filteredRecipesByTag = filteredRecipes;
    }
  };

  // Exécute lors de l'appel dans index.js
  filters.forEach((filter) => {
    filter.button.addEventListener("click", () => {
      toggleFilter(filter);
    });
  });

  // Efface les tags lorsque l'utilisateur effectue une recherche générale dans la barre de recherche principale
  const filterInput = document.getElementById("header-search");
  const filterEmpty = document.getElementById(`empty-filter-header-search`);
  filterInput.addEventListener("input", (event) => {
    let inputText = event.target.value;
    if (inputText.length === 1) {
      closeAllFilters(allListButtons, allListDOM);
      removeAllTags();
    }
  });
  // Vide le tag lors du clic sur la croix de recherche
  filterEmpty.addEventListener("click", () => {
    closeAllFilters(allListButtons, allListDOM);
    removeAllTags();
  });
};

/**
 * Ferme tous les filtres
 * @param {NodeList} filtersButtons - Liste des boutons des filtres
 * @param {NodeList} filtersListDOM - Liste des conteneurs de listes de filtres
 */
const closeAllFilters = (filtersButtons, filtersListDOM) => {
  filtersButtons.forEach((button) => {
    button.classList.remove("filter--open");
    button.setAttribute("aria-expanded", false);
  });
  filtersListDOM.forEach((list) => {
    list.classList.remove("filter__list-container--open");
    list.classList.remove("filter__list-container--close");
  });
};

export { manageFilters };
