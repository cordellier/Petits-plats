import { manageCaracter } from "./aideBalise.js";

/**
 * Gère la liste des éléments affichés lorsque l'utilisateur tape dans l'entrée pour filtrer par tag
 * @param {object} filter
 * @param {function} manageFilterList
 */
const manageTags = (filter, manageFilterList) => {
  const originalFilterDatas = filter.datas;
  const filterInput = document.getElementById(`filter-search-${filter.name}`);
  const filterEmpty = document.getElementById(`empty-filter-${filter.name}`);
  filterInput.value = "";
  filterEmpty.classList.remove("empty-input-button--typing");
  // Événement de saisie
  filterInput.addEventListener("input", (event) => {
    let inputText = event.target.value;
    inputText = manageCaracter(inputText);
    filterEmpty.classList.add("empty-input-button--typing");
    if (inputText.length === 0) {
      filterEmpty.classList.remove("empty-input-button--typing");
    }
    if (inputText.length > 0) {
      filter.datas = originalFilterDatas.filter((word) =>
        word.toLowerCase().includes(inputText.toLowerCase())
      );
      manageFilterList(filter);
    }
  });

  // Vider l'entrée lors du clic sur la croix
  filterEmpty.addEventListener("click", () => {
    filterInput.value = "";
    filterEmpty.classList.remove("empty-input-button--typing");
    filter.datas = originalFilterDatas;
    manageFilterList(filter);
  });
};

export { manageTags };
