import axios from "axios";
import { useEffect, useState } from "react";
import { colorByType } from "../constants/pokemon";

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    versions: {
      "generation-v": {
        "black-white": {
          front_default: string;
        };
      };
    };
  };
  types: PokemonType[];
}

interface Props {
  pokemonURL: string;
  onClick: (pokemon: Pokemon | null) => void;
}

const PokemonPreview: React.FC<Props> = ({ pokemonURL, onClick }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    axios
      .get<Pokemon>(pokemonURL)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, [pokemonURL]);

  return (
    <article
      onClick={() => onClick(pokemon)}
      className="group grid gap-2 cursor-pointer hover:border-slate-200 border-transparent shadow-state-400/10 border-2 border-state-200 shadow-lg text-center bg-white rounded-[30px] relative font-semibold capitalize pb-2 pb-4"
    >
      <header className="h-9">
        <img
          className="pixelated group-hover:scale-110 transition-transform absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2"
          src={
            pokemon?.sprites.versions["generation-v"]["black-white"]
              .front_default
          }
          alt=""
        />
      </header>
      <span className="text-sm text-slate-400">N° {pokemon?.id}</span>
      <h4 className="text-lg">{pokemon?.name}</h4>
      <ul className="flex gap-2 justify-center">
        {pokemon?.types.map((type) => (
          <li
            className={`text-sm p-1 text-white rounded-md px-2 ${
              colorByType[type.type.name]
            }`}
            key={type.type.name}
          >
            {type.type.name}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PokemonPreview;
