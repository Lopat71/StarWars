// Модуль для работы с API Star Wars.
// Все методы обращаются к стороннему сервису, запрашивают данные у него.
// Методы асинхронны, они возвращают Promise.

// Есть следующие методы:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

// Код ниже разбирать не нужно.
// Всё, что вам необходимо знать: эти методы умеют получать данные и возвращают промисы.
// Поробуйте запустить их в своем скрипте search.js.

const starWars = {
  // --- Search Methods ---

  searchCharacters: async (query) => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/people/?search=${query}`
      );

      if (!response.ok) return "Error";
      return response.json();
    } catch (error) {
      return "Error";
    }
  },

  searchPlanets: async (query) => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/planets/?search=${query}`
      );

      if (!response.ok) return "Error";
      return response.json();
    } catch (error) {
      return "Error";
    }
  },

  searchSpecies: async (query) => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/species/?search=${query}`
      );

      if (!response.ok) return "Error";
      return response.json();
    } catch (error) {
      return "Error";
    }
  },

  // --- Get By Id Methods ---

  getCharactersById: async (id) =>
    await (await fetch(`https://swapi.py4e.com/api/people/${id}`)).json(),

  getPlanetsById: async (id) =>
    await (await fetch(`https://swapi.py4e.com/api/planets/${id}`)).json(),

  getSpeciesById: async (id) =>
    await (await fetch(`https://swapi.py4e.com/api/species/${id}`)).json(),

  getFilmsById: async (id) =>
    await (await fetch(`https://swapi.py4e.com/api/films/${id}`)).json(),
};

