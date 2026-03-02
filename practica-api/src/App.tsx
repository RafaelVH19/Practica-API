import { useEffect, useMemo, useRef, useState } from 'react';
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
  const detailsSectionRef = useRef<HTMLElement | null>(null)

  const stats = useMemo(() => {
    return {
      totalCharacters: characters.length,
      filteredCharacters: filteredCharacters.length,
      selectedCharacterId: selectedCharacter?.id ?? 'Ninguno',
    };
  }, [characters.length, filteredCharacters.length, selectedCharacter]);

  const scrollToDetails = () => {
    detailsSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  useEffect(() => {
    if (!selectedCharacter) return;
    const raf = requestAnimationFrame(scrollToDetails);
    return () => cancelAnimationFrame(raf);
  }, [selectedCharacter?.id]);

  useEffect(() => {
    if (!selectedCharacter || detailsLoading) return;
    const raf = requestAnimationFrame(scrollToDetails);
    return () => cancelAnimationFrame(raf);
  }, [selectedCharacter?.id, detailsLoading])

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

      <section>
        <section ref={detailsSectionRef}>
          <CharacterDetails
            character={selectedCharacter}
            details={details}
            detailsLoading={detailsLoading}
            detailsError={detailsError}
          />
        </section>

        <section className="text-gray-600 body-font">
          <div className="container mx-auto px-5 py-8">
            <div className="mx-auto w-full max-w-2xl">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
          </div>
        </section>

        <section className="flex w-full mb-8 leading-relaxed items-center justify-center">
          <article className="px-8 mb-8 leading-relaxed">
            <span>Total de personajes: </span>
            <strong>{stats.totalCharacters}</strong>
          </article>
          <article className="px-8 mb-8 leading-relaxed">
            <span>Personajes filtrados: </span>
            <strong>{stats.filteredCharacters}</strong>
          </article>
          <article className="px-8 mb-8 leading-relaxed">
            <span>Id del personaje seleccionado: </span>
            <strong>{stats.selectedCharacterId}</strong>
          </article>
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