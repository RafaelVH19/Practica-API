import { useEffect, useState } from 'react';
import { fetchDetailsByCharacter, type Details } from '../lib/api';

export function useDetails(characterId: number | null) {
  const [details, setDetails] = useState<Details>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (characterId === null) {
      setDetails(undefined);
      setError('');
      setLoading(false);
      return;
    }

    const id = characterId;
    let active = true;

    async function loadDetails() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchDetailsByCharacter(id);
        if (active) setDetails(data);
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Error al cargar detalles');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadDetails();

    return () => {
      active = false;
    };
  }, [characterId]);

  return {
    details,
    loading,
    error,
  };
}
