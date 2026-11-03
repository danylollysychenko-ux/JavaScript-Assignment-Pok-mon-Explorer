const characterDiv = document.getElementById("characterCards");
const MAX_STAT_VALUE = 255;
const searchBtn = document.getElementById("searchBtn");
const textInput = document.getElementById("text-input");

async function makeGridOfCharacters(searchBtn, textInput) {
  characterDiv.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    setTimeout(async () => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then((response) => response.json())
        .then((data) => {
          if (data.id <= 12) {
            createCharacterCard(data);
          }
        });
    }, 100);
  }
  searchBtn.addEventListener("click", () => {
    search(textInput);
  });

  showFirstBtn.addEventListener("click", () => {
    showFirst12();
  });
}

function createCharacterCard(character) {
  characterDiv.innerHTML += getElement(character);
}

function makeStatElem(stat_val, stat_lbl) {
  const percent = (stat_val / MAX_STAT_VALUE) * 100;

  return `
  <div class = "loader-div">
    <h5 class="stat-label ${stat_lbl}">${stat_lbl}  ${stat_val}</h5>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${percent}%">
      </div>
    </div>
  </div>
  `;
}

function search(textInput) {
  // search function for the search button...
  characterDiv.innerHTML = "";
  for (let i = 1; i <= 1351; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then((response) => response.json())
      .then((data) => {
        if (textInput.value == data.name) {
          createCharacterCard(data);
        } else if (textInput.value == data.id) {
          createCharacterCard(data);
        }
      });
  }
}

function showFirst12() {
  //showFirst12 function for the showFirst12 button...
  const showFirstBtn = document.getElementById("showFirstBtn");
  characterDiv.innerHTML = "";

  for (let i = 1; i <= 12; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then((response) => response.json())
      .then((data) => {
        createCharacterCard(data);
      });
  }
}

function getElement(data) {
  return `<div class="card">
            <h7>#${data.id}</h7>
            <img src="${data.sprites.front_default}" alt="Not Found">
            <h3 id="nameOfCharacter">${data.name}</h3>
            <h3 id=type>${data.types
              .map((elem) => {
                return elem.type.name;
              })
              .join(" ")}</h3>
              <div class = "stats">
                ${makeStatElem(data.stats[0].base_stat, "HP")}
                ${makeStatElem(data.stats[1].base_stat, "Attack")}
                ${makeStatElem(data.stats[2].base_stat, "Defence")}
              </div>
            </div>`;
}

makeGridOfCharacters(searchBtn, textInput);
