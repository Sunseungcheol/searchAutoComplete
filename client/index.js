const search = document.querySelector("#search-field");

document.addEventListener("DOMContentLoaded", function () {
  search.addEventListener("keyup", searchKeyup);
});

function searchKeyup() {
  let searchVal = search.value;
  fetch(
    `https://search-auto-complete-default-rtdb.firebaseio.com/autocomplete.json`
  )
    .then((response) => response.json())
    .then((json) => {
      //console.log(json);
      const autocompResults = document.querySelector(".autocomplete-results");
      let autoText = "";
      //console.log(autocompResults);
      const array1 = json[searchVal] || [];
      for (let i = 0; i < array1.length; i++) {
        autoText += `<li>${json[searchVal][i]}</li>`;
      }
      autocompResults.innerHTML = autoText;
    })
    .finally(function () {
      const autocompLi = document.querySelectorAll(".autocomplete-results li");
      autocompLi.forEach((e) => {
        e.addEventListener("click", function () {
          search.value = e.innerHTML;
          searchKeyup();
        });
      });
    });
}
