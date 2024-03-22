import { firstLetter } from "./aideBalise.js";

/**
 * Gère la requête en fonction de la valeur de filtre et du filtre par (peut être le nom, la description, les ingrédients, ...)
 * Barre de recherche + filtres avancés
 * @param {Array} recipes - La liste des recettes à filtrer.
 * @param {string} filterValue - La valeur de filtre saisie par l'utilisateur.
 * @param {Array} filterBy - Le tableau des critères de filtre, pouvant inclure "ingredient", "appliance" et "ustensile".
 * @returns {Array}
 */
const filtersQueries = (recipes, filterValue, filterBy) => {
  // Convertit la valeur du filtre en minuscules pour une correspondance insensible à la casse
  const filterValueLowerCase = filterValue.toLowerCase();
  // Filtrer les recettes en fonction des filtres spécifiés
  const filteredRecipes = recipes.filter((recipe) => {
    // Vérifie si au moins l'un des filtres correspond à la recette actuelle
    // si un filtre correspond, passer à la recette suivante
    return filterBy.some((filter) => {
      // si le filtre est un tableau
      if (filter === "ingredients" || filter === "ustensils") {
        const elementList = recipe[filter];
        // Vérifie si au moins un élément de la liste correspond à la valeur filtrée (si c'est le cas, passer à la recette suivante)
        // 'break' équivalent si vrai
        return elementList.some((element) => {
          const elementText =
            filter === "ingredients" ? element.ingredient : element;
          // 'break' équivalent si vrai
          return elementText.toLowerCase().includes(filterValueLowerCase);
        });
      } else {
        // Vérifie si l'attribut de recette correspond à la valeur filtrée pour les autres types de filtres
        return recipe[filter].toLowerCase().includes(filterValueLowerCase);
      }
    });
  });
  return filteredRecipes;
};

// **FILTRES AVANCES POUR LES TAGS */

/**
 * Obtient tous les éléments (ingrédients, appareils, ustensiles, ...) des recettes
 * @param {Array} recipesList
 * @param {string} filterBy
 * @returns
 */
const getRecipesElements = (recipesList, filterBy) => {
  let elementList = [];
  let formattedElement;

  recipesList.forEach((recipe) => {
    if (filterBy === "ingredients" || filterBy === "ustensils") {
      recipe[filterBy].forEach((element) => {
        if (filterBy === "ingredients") {
          formattedElement = firstLetter(element.ingredient.toLowerCase());
        } else {
          formattedElement = firstLetter(element.toLowerCase());
        }
        if (!elementList.includes(formattedElement)) {
          elementList.push(formattedElement);
        }
      });
    } else if (filterBy === "appliances") {
      const formattedAppliance = firstLetter(recipe.appliance.toLowerCase());
      if (!elementList.includes(formattedAppliance)) {
        elementList.push(formattedAppliance);
      }
    }
  });

  elementList.sort((a, b) => a.localeCompare(b));
  return elementList;
};

export { filtersQueries, getRecipesElements };
