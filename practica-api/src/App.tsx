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
      <section className="text-white body-font bg-indigo-600">
        <div className="container mx-auto flex px-5 py-20 items-center justify-center flex-col">
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-5xl text-3xl mb-4 font-medium">Buscador de Personajes de Simpsons</h1>
            <p className="mb-8 leading-relaxed">Practica React + TypeScript. Consume una API publica con <code>fetch</code>, usa <code>useEffect</code> para cargar datos,
          filtra resultados con un formulario controlado y muestra comentarios de forma asincrona.</p>
          </div>
        </div>
      </section>

      <section className="layout">
        <CharacterDetails
          character={selectedCharacter}
          details={details}
          detailsLoading={detailsLoading}
          detailsError={detailsError}
        />

      <section className="text-gray-600 body-font">
        <div className="container mx-auto px-5 py-8">
          <div className="mx-auto w-full max-w-2xl">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>
      </section>

        <CharacterList
          characters={filteredCharacters}
          selectedCharacterId={selectedCharacter?.id ?? null}
          onSelectCharacter={setSelectedCharacter}
          loading={loading}
          error={error}
        />
      </section>
    </main>
  );
}