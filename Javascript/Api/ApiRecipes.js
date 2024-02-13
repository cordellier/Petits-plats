//**LIAISON AVEC LA BASE DE DONNEES */

import { recipes } from "../Data/Recipes.js";

/**
 * Gère les données de la base de données des recettes
 * Pour le moment, les données sont stockées dans un fichier JS
 * @returns {functions}
 */
const ApiRecipes = () => {
  /**
   * Fonction pour lier la base de données afin de faciliter les appels
   * @returns {Array}
   */
  const getRecipes = () => {
    return { recipes };
  };

  return { getRecipes };
};

export { ApiRecipes };
