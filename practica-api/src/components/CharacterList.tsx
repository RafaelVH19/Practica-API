import type { Character } from '../lib/api';
import Article from './article';

type CharacterListProps = {
  characters: Character[];
  selectedCharacterId: number | null;
  onSelectCharacter: (character: Character) => void;
  loading: boolean;
  error: string;
};

export default function CharacterList({ characters, selectedCharacterId, onSelectCharacter, loading, error }: CharacterListProps) {
  if (loading) {
    return <section className="panel"><p>Cargando personajes...</p></section>;
  }

  if (error) {
    return <section className="panel"><p className="error-text">{error}</p></section>;
  }

  if (!characters.length) {
    return <section className="panel"><p>No hay personajes que coincidan con la busqueda.</p></section>;
  }

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {characters.map((character) => (
        <div className="text-center rounded-xl border p-4 transition hover:shadow-md hover:-translate-y-0.5 hover:outline hover:outline-2 hover:outline-indigo-600">
          <Article 
            key={character.id}
            character={character}
            selected={selectedCharacterId === character.id}
            onSelect={onSelectCharacter}
          />
        </div>
      ))}
    </section>
  );
}
