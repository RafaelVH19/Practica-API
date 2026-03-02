import { useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails'
import { useDetails } from './hooks/useDetails'
import { useCharacters } from './hooks/useCharacters';
import type { Character } from './lib/api';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const { filteredCharacters, characters, loading, error } = useCharacters(searchTerm);
  const { details, loading: detailsLoading, error: detailsError } = useDetails(selectedCharacter?.id ?? null);

  const stats = useMemo(() => {
    return {
      totalCharacters: characters.length,
      filteredCharacters: filteredCharacters.length,
      selectedCharacterId: selectedCharacter?.id ?? 'Ninguno',
    };
  }, [characters.length, filteredCharacters.length, selectedCharacter]);

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Practica React + TypeScript</p>
        <h1>Explorador de publicaciones</h1>
        <p>
          Consume una API publica con <code>fetch</code>, usa <code>useEffect</code> para cargar datos,
          filtra resultados con un formulario controlado y muestra comentarios de forma asincrona.
        </p>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total de posts</span>
          <strong>{stats.totalCharacters}</strong>
        </article>
        <article className="stat-card">
          <span>Posts filtrados</span>
          <strong>{stats.filteredCharacters}</strong>
        </article>
        <article className="stat-card">
          <span>Post seleccionado</span>
          <strong>{stats.selectedCharacterId}</strong>
        </article>
      </section>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <section className="layout">
        <CharacterList
          characters={filteredCharacters}
          selectedCharacterId={selectedCharacter?.id ?? null}
          onSelectCharacter={setSelectedCharacter}
          loading={loading}
          error={error}
        />
        <CharacterDetails
          character={selectedCharacter}
          details={details}
          detailsLoading={detailsLoading}
          detailsError={detailsError}
        />
      </section>
    </main>
  );
}