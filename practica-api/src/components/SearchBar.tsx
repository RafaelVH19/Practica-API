type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (

    <div className="w-full flex justify-center">
      <label className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="ej. Homer"
        />
      </label>
    </div>
  );
}