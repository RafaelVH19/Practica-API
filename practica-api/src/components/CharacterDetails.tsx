import type { Details, Character } from '../lib/api';

type CharacterDetailsProps = {
  character: Character | null;
  details: Details | undefined;
  detailsLoading: boolean;
  detailsError: string;
};

export default function CharacterDetails({ character, details, detailsLoading, detailsError }: CharacterDetailsProps) {
  if (!character) {
    return (
      <section className="panel detail-panel empty-state">
        <h2>Selecciona un personaje</h2>
        <p>Haz clic en una tarjeta para ver detalles.</p>
      </section>
    );
  }

  return (
    <section className="panel detail-panel">
      <span className="post-card-id">Post #{character.id}</span>
      <h2>{character.name}</h2>
      <p className="detail-body">{character.occupation}</p>

      <div className="comments-header">
        <h3>Descripcion</h3>
      </div>

      {detailsLoading ? <p>Cargando descripcion...</p> : null}
      {detailsError ? <p className="error-text">{detailsError}</p> : null}

      {!detailsLoading && !detailsError && details ? (
        <ul className="comment-list">
          <li key={details.id} className="comment-card">
            <strong>{details.description}</strong>
            <span>{details.birthdate}</span>
            <p>{details.status}</p>
          </li>
        </ul>
      ) : null}
    </section>
  );
}
