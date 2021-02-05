const search = document.querySelector("#search-field");

document.addEventListener("DOMContentLoaded", function () {
  search.addEventListener("keyup", searchKeyup);
});

function searchKeyup() {
  fetch(`http://localhost:3000/autocomplete?keyword=${search.value}`)
    .then((response) => response.json())
    .then((json) => {
      //console.log(json);
      const autocompResults = document.querySelector(".autocomplete-results");
      let autoText = "";
      //console.log(autocompResults);
      for (let i = 0; i < json.length; i++) {
        autoText += `<li>${json[i]}</li>`;
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
