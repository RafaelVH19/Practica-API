import type { Character } from '../lib/api'

interface ArticleProps {
    character: Character;
    selected: boolean;
    onSelect: (character: Character) => void;
}

export default function Article(props: ArticleProps) {
    return (
        <button 
            type="button"
            key={props.character.id}
            onClick={() => props.onSelect(props.character)}
        >
            <div className="rounded-lg h-64 overflow-hidden">
                <img alt="content" className="object-cover object-center h-full w-full" src={`https://cdn.thesimpsonsapi.com/500${props.character.portrait_path}`} />
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">{props.character.name}</h2>
            <p className="text-base leading-relaxed mt-2">{props.character.occupation}</p>
        </button>
    );
}