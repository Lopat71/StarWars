interface SearchResult<T> {
  results: T[];
}

interface StarWarsAPI {
  searchCharacters(query: string): Promise<SearchResult<Character>>;
  searchPlanets(query: string): Promise<SearchResult<Planet>>;
  searchSpecies(query: string): Promise<SearchResult<Species>>;
}

const buttonSearch = document.querySelector<HTMLButtonElement>("#byQueryBtn")!;
const inputSearch = document.querySelector<HTMLInputElement>(".input")!;
const deleteButton = document.querySelector<HTMLButtonElement>(".delete")!;
const loader = document.querySelector<HTMLDivElement>(".spinner")!;
const resultContainer =
  document.querySelector<HTMLDivElement>("#result-container")!;
const resultTitle =
  document.querySelector<HTMLParagraphElement>(".message-header p")!;
const contentDiv = document.querySelector<HTMLDivElement>("#content")!;

buttonSearch.addEventListener("click", getResult);

inputSearch.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    buttonSearch.click();
  }
});

deleteButton.addEventListener("click", () => {
  contentDiv.innerHTML = "";
  resultContainer.style.visibility = "hidden";
  inputSearch.value = "";
});

async function getResult(): Promise<void> {
  loader.style.visibility = "visible";

  const query = inputSearch.value;
  const result = await fetchResource(query);

  loader.style.visibility = "hidden";
  addResultToHTML(result);
  resultContainer.style.visibility = "visible";
}

async function addResultToHTML(result: SearchResult<Character>): Promise<void> {
  if (result.results && result.results.length > 0) {
    const character = result.results[0];
    resultTitle.textContent = character.name;

    contentDiv.innerHTML = "";

    if (character.homeworld) {
      const response = await fetch(character.homeworld);
      const planet: Planet = await response.json();
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

async function fetchResource(query: string): Promise<SearchResult<Character>> {
  const resourceSelect = document.querySelector<HTMLSelectElement>("#options")!;
  const selectedResource = resourceSelect.value;

  try {
    if (selectedResource === "people") {
      return await starWars.searchCharacters(query);
    } else if (selectedResource === "planets") {
      return await starWars.searchPlanets(query);
    } else if (selectedResource === "species") {
      return await starWars.searchSpecies(query);
    } else {
      resultTitle.textContent = "Not Found";
      return { results: [] };
    }
  } catch (error) {
    console.error("Error fetching resource:", error);
    return { results: [] };
  }
}
