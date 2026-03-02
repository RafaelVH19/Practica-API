import { useEffect, useMemo, useState } from 'react';
import { fetchCharacters, type Characters } from '../lib/api';

export function useCharacter(name: string) {
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadCharacters() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchCharacters();
        if (active) setCharacters(data);
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Error al cargar posts');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadCharacters();

    return () => {
      active = false;
    };
  }, []);

  const filteredCharacters = useMemo(() => {
    const normalized = name.trim().toLowerCase();
    if (!normalized) return characters;

    return characters.filter((character) => character.name.toLowerCase().includes(normalized));
  }, [characters, name]);

  return {
    characters,
    filteredCharacters,
    loading,
    error,
  };
}
