export type Character = {
  id: number;
  age: number;
  birthdate: string;
  gender: string;
  name: string;
  occupation: string;
  portrait_path: string;
  phrases: [string];
  status: string;
};

const API_BASE_URL = 'https://thesimpsonsapi.com/api/characters';

async function handleResponse<T>(response: Response, defaultMessage: string): Promise<T> {
  if (!response.ok) {
    throw new Error(defaultMessage);
  }

  return response.json() as Promise<T>;
}

export async function fetchPosts(id: number): Promise<Character[]> {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return handleResponse<Character[]>(response, 'No se pudieron cargar las publicaciones');
}
