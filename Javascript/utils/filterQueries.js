import { firstLetter } from "./aideBalise.js";

/**
 * Gère la requête en fonction de la valeur de filtre et du filtre par (peut être le nom, la description, les ingrédients, ...)
 * Barre de recherche + filtres avancés
 * @param {Array} recipes
 * @param {string} filterValue
 * @param {Array} filterBy
 * @returns {Array}
 */
const filtersQueries = (recipes, filterValue, filterBy) => {
  // Convertit la valeur du filtre en minuscules pour une correspondance insensible à la casse
  const filterValueLowerCase = filterValue.toLowerCase();
  const filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    let j = 0;
    // Parcours des critères de filtrage
    while (j < filterBy.length) {
      // Gestion des tableaux dans la recette
      if (filterBy[j] === "ingredients" || filterBy[j] === "ustensils") {
        const elementList = recipes[i][filterBy[j]];
        let k = 0;
        // Parcours des éléments dans le tableau
        while (k < elementList.length) {
          let element = elementList[k];
          // Si le critère est 'ingredients', on prend seulement l'ingrédient
          if (filterBy[j] === "ingredients") {
            element = elementList[k].ingredient;
          }
          // Vérification si l'élément contient la valeur de filtrage
          if (element.toLowerCase().includes(filterValueLowerCase)) {
            filteredRecipes.push(recipes[i]);
            // Dès que l'élément de recherche est trouvé dans une recette, on passe à la suivante
            k = elementList.length;
            j = filterBy.length;
          }
          k++;
        }
      } else {
        // Vérification si la propriété de la recette contient la valeur de filtrage
        if (
          recipes[i][filterBy[j]].toLowerCase().includes(filterValueLowerCase)
        ) {
          filteredRecipes.push(recipes[i]);
          // Dès que l'élément de recherche est trouvé dans une recette, on passe à la suivante
          j = filterBy.length;
        }
      }
      j++;
    }
  }
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
