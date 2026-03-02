export type Character = {
  id: number;
  age: number;
  birthdate: string;
  gender: string;
  name: string;
  occupation: string;
  portrait_path: string;
  phrases: string[];
  status: string;
};

export type Appearance = {
  id: number;
  airdate: string;
  description: string;
  episode_number: number;
  image_path: string;
  name: string;
  season: string;
  synopsis: string;
}

export type Details = {
  id: number;
  age: number;
  birthdate: string;
  description: string;
  first_appearance_ep_id: number;
  first_appearance_sh_id: number;
  gender: string;
  name: string;
  occupation: string;
  phrases: string[];
  portrait_path: string;
  status: string;
  first_appearance_ep: Appearance;
  first_appearance_sh: Appearance;
}

export type CharactersResponse = {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: Character[];
};

const API_BASE_URL = 'https://thesimpsonsapi.com/api/characters';

async function handleResponse<T>(response: Response, defaultMessage: string): Promise<T> {
  if (!response.ok) {
    throw new Error(defaultMessage);
  }

  return response.json() as Promise<T>;
}

export async function fetchCharacters(): Promise<CharactersResponse> {
  const response = await fetch(`${API_BASE_URL}`);
  return handleResponse<CharactersResponse>(response, 'No se pudieron cargar los personajes');
}

export async function fetchDetailsByCharacter(characterId: number): Promise<Details> {
  const response = await fetch(`${API_BASE_URL}/${characterId}`);
  return handleResponse<Details>(response, 'No se pudo cargar la descripcion');
}
