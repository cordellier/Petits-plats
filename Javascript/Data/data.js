//** Gestion des Objets, Recettes */

/**
Créer un objet recette
@param {object} data
*/
const Recipe = (data) => ({
  id: data.id,
  image: data.image,
  name: data.name,
  portions: data.portions,
  ingredients: data.ingredients,
  time: data.time,
  description: data.description,
  appareil: data.appareil,
  ustensiles: data.ustensiles,
});
export { Recipe };
