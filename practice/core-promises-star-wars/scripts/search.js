// Методы, которые могут пригодиться:
// starWars.searchCharacters(query);
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

// Тут ваш код.
// Объект с методом поиска персонажей

const buttonSearch = document.querySelector("#byQueryBtn");

const inputSearch = document.querySelector(".input");

const deleteButton = document.querySelector(".delete");
const loader = document.querySelector(".spinner");
const resultContainer = document.querySelector("#result-container");
const resultTitle = document.querySelector(".message-header p");
const contentDiv = document.querySelector("#content");

buttonSearch.addEventListener("click", getResult);

inputSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    buttonSearch.click();
  }
});

deleteButton.addEventListener("click", () => {
  const contentDiv = document.querySelector("#content");
  contentDiv.innerHTML = "";

  const resultContainer = document.querySelector("#result-container");
  resultContainer.style.visibility = "hidden";

  const inputSearch = document.querySelector(".input");
  inputSearch.value = "";
});

async function getResult() {
  loader.style.visibility = "visible";

  const query = inputSearch.value;
  const result = await fetchResource(query);

  loader.style.visibility = "hidden";
  addResultToHTML(result);
  resultContainer.style.visibility = "visible";
}

async function addResultToHTML(result) {
  if (result.results && result.results.length > 0) {
    const character = result.results[0];
    resultTitle.textContent = character.name;

    contentDiv.innerHTML = "";

    if (character.homeworld) {
      const response = await fetch(character.homeworld);
      const planet = await response.json();
      character.homeworld = planet.name;
    }

    const ul = document.createElement("ul");
    for (const [key, value] of Object.entries(character)) {
      const li = document.createElement("li");

      if (Array.isArray(value)) {
        li.innerHTML = `${key}:`;
        const subUl = document.createElement("ul");

        value.forEach((item) => {
          const subLi = document.createElement("li");
          subLi.textContent = item;
          subUl.appendChild(subLi);
        });

        li.appendChild(subUl);
      } else {
        li.innerHTML = `${key}: ${value}`;
      }

      ul.appendChild(li);
    }
    contentDiv.appendChild(ul);
  } else {
    resultTitle.textContent = "Not Found";
  }
}

async function fetchResource(query) {
  const resourceSelect = document.querySelector("#options");
  const selectedResource = resourceSelect.value;

  let result;

  try {
    if (selectedResource === "people") {
      result = await starWars.searchCharacters(query);
    } else if (selectedResource === "planets") {
      result = await starWars.searchPlanets(query);
    } else if (selectedResource === "species") {
      result = await starWars.searchSpecies(query);
    } else {
      resultTitle.textContent = "Not Found";
    }

    return result;
  } catch (error) {
    return { results: [] };
  }
}
