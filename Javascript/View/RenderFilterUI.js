//**STRUCTURE DES FILTRES */

/**
 * Affiche le filtre en fonction du type (ingrédients, appareils, ustensiles)
 * @param {string} NameOfFilter - Nom du filtre
 * @returns {HTMLElement} - Code HTML représentant le filtre
 */
const displaySingleFilter = (NameOfFilter) => {
  let NameOfFilterFormatted;
  switch (NameOfFilter) {
    case "ingredients":
      NameOfFilterFormatted = "Ingrédients";
      break;
    case "appliances":
      NameOfFilterFormatted = "Appareils";
      break;
    case "ustensils":
      NameOfFilterFormatted = "Ustensiles";
      break;
    default:
      NameOfFilterFormatted = "";
      break;
  }

  const filterContainer = document.createElement("div");
  filterContainer.className = "filter__container";

  const filter = `
      <button type="button" name="${NameOfFilterFormatted}" class="filter__button flex-row" id="filter-${NameOfFilter}" aria-expanded="false"
            aria-controls="${NameOfFilter}-list" aria-label="${NameOfFilterFormatted} à filtrer" aria-haspopup="listbox">
        ${NameOfFilterFormatted}
        <img src="../../Assets/img/Icon/ArrowFilter.svg">
      </button>
      <div class="filter__list-container flex-col" id="${NameOfFilter}-list">
        <!-- input filter search -->
        <div class="filter__input-container input-container flex-row" >
          <label for="filter-search-${NameOfFilter}" class="visually-hidden">Rechercher par ${NameOfFilter}</label>
            <input id="filter-search-${NameOfFilter}" class="input" type="search">
            <div class='cross-svg'>
                <button id="empty-filter-${NameOfFilter}" class="empty-input-button">
                    <img src="../../Assets/img/Icon/FilterSearchClose.svg">
                </button>
            </div>
            <img src="../../Assets/img/Icon/LoupeFilter.svg">
        </div>
        <ul class="filter__list-items flex-col" role="listbox" id="${NameOfFilter}-list-items">
        <!-- list of ${NameOfFilter} -->
        <!-- generate into js file -->
        </ul>
      </div>
    `;
  filterContainer.innerHTML = filter;

  return filterContainer;
};

export { displaySingleFilter };
