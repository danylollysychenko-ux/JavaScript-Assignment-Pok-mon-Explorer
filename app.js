const characterDiv = document.getElementById("characterCards");
const MAX_STAT_VALUE = 160;
const searchBtn = document.getElementById("searchBtn");
const textInput = document.getElementById("text-input");
const showFirstBtn = document.getElementById("showFirstBtn");

async function makeGridOfCharacters(searchBtn) {
  characterDiv.innerHTML = "";
  for (let i = 1; i <= 34; i++) {
    let div = document.createElement("div");
    div.id = `Poke-${i}`;
    characterDiv.append(div);
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          createCharacterCard(data);
        }
      });
  }
  searchBtn.addEventListener("click", () => {
    search();
  });

  showFirstBtn.addEventListener("click", () => {
    showFirst12();
  });
}

function createCharacterCard(character) {
  let poke = document.getElementById("Poke-" + character.id);
  poke.innerHTML = getElement(character);
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

function search() {
  // search function for the search button...
  text = textInput.value;
  characterDiv.innerHTML = "";
  let div = document.createElement("div");
  div.id = `Poke-${text}`;
  characterDiv.append(div);
  fetch(`https://pokeapi.co/api/v2/pokemon/${text}/`)
    .then((response) => response.json())
    .then((data) => {
      createCharacterCard(data);
    });
}

function showFirst12() {
  //showFirst12 function for the showFirst12 button...
  characterDiv.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    let div = document.createElement("div");
    div.id = `Poke-${i}`;
    characterDiv.append(div);
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          createCharacterCard(data);
        }
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

makeGridOfCharacters(searchBtn);
