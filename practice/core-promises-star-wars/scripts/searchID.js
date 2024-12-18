const buttonSearchID = document.querySelector("#byQueryBtnID");
const inputSearchId = document.querySelector("#input-id");
buttonSearchID.addEventListener("click", getResultID);

inputSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    buttonSearchID.click();
  }
});

async function getResultID() {
  loader.style.visibility = "visible";

  const query = inputSearchId.value;

  loader.style.visibility = "hidden";
  addResultToHTMLid(query);
  resultContainer.style.visibility = "visible";
}
async function addResultToHTMLid(resultId) {
  contentDiv.innerHTML = "";

  const resourceSelect = document.querySelector("#options-Id");
  const selectedResource = resourceSelect.value;

  let resourceDetails;

  try {
    if (selectedResource === "people") {
      resourceDetails = await starWars.getCharactersById(resultId);
    } else if (selectedResource === "planets") {
      resourceDetails = await starWars.getPlanetsById(resultId);
    } else if (selectedResource === "species") {
      resourceDetails = await starWars.getSpeciesById(resultId);
    } else {
      resultTitle.textContent = "Invalid resource selected";
      return;
    }

    resultTitle.textContent =
      resourceDetails.name || resourceDetails.title || "Not Found";

    const ul = document.createElement("ul");
    for (const [key, value] of Object.entries(resourceDetails)) {
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
  } catch (error) {
    resultTitle.textContent = "Not Found";
  }
}
