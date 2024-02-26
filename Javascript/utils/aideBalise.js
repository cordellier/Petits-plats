/**
 * Mettre la première lettre en majuscule
 * @param {string} string
 * @returns {string}
 */
const firstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Prévenir l'injection XSS en remplaçant les balises HTML dans les formulaires
 * @param {string} input
 * @returns {string}
 */
function manageCaracter(input) {
  return input.replace(/<[^>]*>/g, "");
}

export { firstLetter, manageCaracter };
