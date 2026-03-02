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
      <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 flex-col items-center">
              <div className="w-full max-w-2xl flex flex-col items-center text-center">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Selecciona un personaje</h1>
                  <p className="mb-8 leading-relaxed">Escoge a un personaje para ver su descripcion.</p>
              </div>
          </div>
      </section>
    );
  }

  return (
    <section className="text-gray-600 body-font">
      {detailsLoading ? <p>Cargando descripcion...</p> : null}
      {detailsError ? <p className="error-text">{detailsError}</p> : null}

      {!detailsLoading && !detailsError && details ? (
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{details.name}
                    <br className="hidden lg:inline-block"/>{details.occupation}
                </h1>
                <p className="mb-8 leading-relaxed">{details.description}</p>
                <p className="mb-4 leading-relaxed">{details.status}</p>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img className="object-cover object-center rounded" alt="hero" src={`https://cdn.thesimpsonsapi.com/500${details.portrait_path}`}/>
            </div>
        </div>
      ) : null}
    </section>
  );
}
