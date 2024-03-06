import { createContext, useState, ReactNode } from "react";
import {
  formatAbilities,
  formatStats,
  formatTypes,
  getEvolutions,
  getImageByPokemon,
  getPokemonDescription,
} from "../helpers/pokemon";
import axios from "axios";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: Record<string, number>;
  types: string[];
  abilities: string[];
  description: string;
  evolutions: string[];
  image: string;
}

interface PokemonInfo {
  species: {
    url: string;
  };
  sprites: Record<string, string>;
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

interface PokemonContextProps {
  showDetailPokemon: boolean;
  showPokemon: (pokemonInfo: PokemonInfo) => void;
  closePokemonDetail: () => void;
  pokemonDetail: Pokemon | null;
}

const PokemonContext = createContext<PokemonContextProps>({
  showDetailPokemon: false,
  showPokemon: () => {},
  closePokemonDetail: () => {},
  pokemonDetail: null,
});

interface PokemonProviderProps {
  children: ReactNode;
}

const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [pokemonDetail, setPokemonDetail] = useState<Pokemon | null>(null);
  const [showDetailPokemon, setShowDetailPokemon] = useState<boolean>(false);

  const showPokemon = async (pokemonInfo: PokemonInfo) => {
    const { data: dataSpecies } = await axios.get(pokemonInfo.species.url);
    const { data: dataEvolution } = await axios.get(
      dataSpecies.evolution_chain.url
    );

    const { id, name, height, weight, stats, types, abilities } = pokemonInfo;
    const evolutions = await getEvolutions(dataEvolution);
    setPokemonDetail({
      id,
      name,
      height,
      weight,
      stats: formatStats(stats),
      types: formatTypes(types),
      abilities: formatAbilities(abilities),
      description: getPokemonDescription(dataSpecies),
      evolutions,
      image: getImageByPokemon(pokemonInfo.sprites),
    });
    setShowDetailPokemon(true);
  };

  const closePokemonDetail = () => {
    setShowDetailPokemon(false);
  };

  return (
    <PokemonContext.Provider
      value={{
        showDetailPokemon,
        showPokemon,
        closePokemonDetail,
        pokemonDetail,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
