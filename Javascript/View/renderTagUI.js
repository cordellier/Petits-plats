//** STRUCTURE DE LA BALISE */

/**
 * Fonction qui crée un élément li pour afficher la balise sélectionnée
 * @param {string} tagName - Nom de la balise
 * @param {html} tagsList - Liste des balises HTML
 * @param {function} removeTag - Fonction pour supprimer la balise
 * @returns {html} - Élément HTML représentant la balise
 */
const renderTag = (tagName, tagsList, removeTag) => {
  const tag = document.createElement("li");
  tag.className = "tag flex-row";
  tag.setAttribute("id", tagName.split(" ").join("") + "-selected");
  const tagContent = document.createElement("span");
  tagContent.textContent = tagName;

  const tagCloseButton = document.createElement("button");
  tagCloseButton.innerHTML = `<svg
          xmlns='http://www.w3.org/2000/svg'
          width='14'
          height='13'
          viewBox='0 0 14 13'
          fill='none'
        >
          <path
            d='M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5'
            stroke='#1B1B1B'
            stroke-width='2.16667'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>`;

  tagCloseButton.addEventListener("click", () => {
    removeTag(tagName);
  });

  tag.appendChild(tagContent);
  tag.appendChild(tagCloseButton);
  tagsList.appendChild(tag);
};

export { renderTag };
