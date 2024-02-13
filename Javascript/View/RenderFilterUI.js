//**STRUCTURE DES FILTRES */

/**
 * Affiche le filtre en fonction du type (ingrédients, appareils, ustensiles)
 * @param {string} filterItem.filter - Nom du filtre
 * @returns {HTMLElement} - Code HTML représentant le filtre
 */
const DisplayFilterDOM = (filterItem) => {
  const filterContainer = document.createElement("div");
  filterContainer.className = "filter__container";

  const filter = `
      <button type="button" name="${filterItem.filter}" class="filter__button flex-row" id="filter-${filterItem.filter}" aria-expanded="false"
            aria-controls="${filterItem.filter}-list" aria-label="${filterItem.filter} à filtrer" aria-haspopup="listbox">
        ${filterItem.placeHolder}
        <img src="../../Assets/img/Icon/ArrowFilter.svg">
      </button>
      <div class="filter__list-container flex-col" id="${filterItem.filter}-list">
        <!-- input filter search -->
        <div class="filter__input-container input-container flex-row" >
          <label for="filter-search-${filterItem.filter}" class="visually-hidden">Rechercher par ${filterItem.filter}</label>
            <input id="filter-search-${filterItem.filter}" class="input" type="search">
            <div class='cross-svg'>
                <button id="empty-filter-${filterItem.filter}" class="empty-input-button">
                    <img src="../../Assets/img/Icon/FilterSearchClose.svg">
                </button>
            </div>
            <img src="../../Assets/img/Icon/LoupeFilter.svg">
        </div>
        <ul class="filter__list-items flex-col" role="listbox" id="${filterItem.filter}-list-items">
        <!-- list of ${filterItem.filter} -->
        <!-- generate into js file -->
        </ul>
      </div>
    `;
  filterContainer.innerHTML = filter;

  return filterContainer;
};

export { DisplayFilterDOM };
