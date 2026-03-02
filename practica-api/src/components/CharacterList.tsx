import type { Character } from '../lib/api';

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
    <section className="panel post-list">
      {characters.map((character) => (
        <button
          key={character.id}
          type="button"
          className={`post-card ${selectedCharacterId === character.id ? 'selected' : ''}`}
          onClick={() => onSelectCharacter(character)}
        >
          <span className="post-card-id">Character #{character.id}</span>
          <strong>{character.name}</strong>
          <p>{character.occupation.slice(0, 110)}...</p>
        </button>
      ))}
    </section>
  );
}
