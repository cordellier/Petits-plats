//**GESTION DES FILTRES */

import { displayFilter } from "../View/RenderFilterUI";

/**
 * Gère les filtres en fonction de la liste des recettes (filtrées ou non)
 * @param {Array} allRecipes - Toutes les recettes
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
  const filterIngredientsDatas = getRecipesElements(
    filteredRecipes,
    "ingredients"
  );
  const filterAppliancesDatas = getRecipesElements(
    filteredRecipes,
    "appliances"
  );
  const filterUstensilsDatas = getRecipesElements(filteredRecipes, "ustensils");
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

  // Ajout des filtres dans le DOM en utilisant la fonction displayFilter
  filters.forEach((filter) => {
    const filterContainer = displayFilter(filter.name);
    // Ajoute le filtre dans le DOM à l'endroit approprié
    document.getElementById("filters-container").appendChild(filterContainer);
  });
};

export { manageFilters };
