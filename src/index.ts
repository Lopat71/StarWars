interface Character {
  name: string;
  homeworld?: string;
  [key: string]: any;
}

interface Planet {
  name: string;
  [key: string]: any;
}

interface Species {
  name: string;
  [key: string]: any;
}

interface Film {
  title: string;
  [key: string]: any;
}

interface SearchResult<T> {
  results: T[];
}

interface StarWarsAPI {
  searchCharacters(query: string): Promise<SearchResult<Character> | string>;
  searchPlanets(query: string): Promise<SearchResult<Planet> | string>;
  searchSpecies(query: string): Promise<SearchResult<Species> | string>;

  getCharactersById(id: number | string): Promise<Character>;
  getPlanetsById(id: number | string): Promise<Planet>;
  getSpeciesById(id: number | string): Promise<Species>;
  getFilmsById(id: number | string): Promise<Film>;
}

const starWars: StarWarsAPI = {
  searchCharacters: async (query: string) => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/people/?search=${query}`
      );
      if (!response.ok) throw new Error(`Error fetching characters`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return "Error";
    }
  },

  searchPlanets: async (query: string) => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/planets/?search=${query}`
      );
      if (!response.ok) throw new Error(`Error fetching planets`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return "Error";
    }
  },

  searchSpecies: async (query: string) => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/species/?search=${query}`
      );
      if (!response.ok) throw new Error(`Error fetching species`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return "Error";
    }
  },

  getCharactersById: async (id: number | string): Promise<Character> => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/people/${id.toString()}`
      );
      if (!response.ok) throw new Error(`Error fetching character by ID`);
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch character by ID");
    }
  },

  getPlanetsById: async (id: number | string): Promise<Planet> => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/planets/${id.toString()}`
      );
      if (!response.ok) throw new Error(`Error fetching planet by ID`);
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch planet by ID");
    }
  },

  getSpeciesById: async (id: number | string): Promise<Species> => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/species/${id.toString()}`
      );
      if (!response.ok) throw new Error(`Error fetching species by ID`);
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch species by ID");
    }
  },

  getFilmsById: async (id: number | string): Promise<Film> => {
    try {
      const response = await fetch(
        `https://swapi.py4e.com/api/films/${id.toString()}`
      );
      if (!response.ok) throw new Error(`Error fetching film by ID`);
      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch film by ID");
    }
  },
};
