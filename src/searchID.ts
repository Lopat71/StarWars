interface SearchResult<T> {
  results: T[];
}

interface StarWarsAPI {
  getCharactersById(id: string): Promise<Character>;
  getPlanetsById(id: string): Promise<Planet>;
  getSpeciesById(id: string): Promise<Species>;
}

const buttonSearchID =
  document.querySelector<HTMLButtonElement>("#byQueryBtnID")!;
const inputSearchId = document.querySelector<HTMLInputElement>("#input-id")!;

if (
  !buttonSearchID ||
  !inputSearchId ||
  !loader ||
  !resultContainer ||
  !resultTitle ||
  !contentDiv
) {
  throw new Error("Некоторые элементы DOM не найдены");
}

buttonSearchID.addEventListener("click", getResultID);

inputSearchId.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    buttonSearchID.click();
  }
});

async function getResultID(): Promise<void> {
  loader.style.visibility = "visible";

  const query = inputSearchId.value.trim();

  loader.style.visibility = "hidden";
  await addResultToHTMLid(query);
  resultContainer.style.visibility = "visible";
}

async function addResultToHTMLid(resultId: string): Promise<void> {
  contentDiv.innerHTML = "";

  const resourceSelect =
    document.querySelector<HTMLSelectElement>("#options-Id");
  if (!resourceSelect) {
    throw new Error("Элемент выбора ресурса не найден");
  }

  const selectedResource = resourceSelect.value;
  let resourceDetails: Character | Planet | Species | undefined;

  try {
    switch (selectedResource) {
      case "people":
        resourceDetails = await starWars.getCharactersById(resultId);
        break;
      case "planets":
        resourceDetails = await starWars.getPlanetsById(resultId);
        break;
      case "species":
        resourceDetails = await starWars.getSpeciesById(resultId);
        break;
      default:
        resultTitle.textContent = "Invalid resource selected";
        return;
    }

    resultTitle.textContent =
      resourceDetails.name || (resourceDetails as any).title || "Not Found";

    const ul = createDetailsList(resourceDetails);
    contentDiv.appendChild(ul);
  } catch (error) {
    console.error("Error fetching resource:", error);
    resultTitle.textContent = "Not Found";
  }
}

function createDetailsList(details: Record<string, any>): HTMLUListElement {
  const ul = document.createElement("ul");

  for (const [key, value] of Object.entries(details)) {
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

  return ul;
}
