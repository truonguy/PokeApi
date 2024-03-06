import React from "react";
import PokemonPreview from "./PokemonPreview";
import usePokemonContext from "../hooks/usePokemonContext";

interface Pokemon {
  url: string;
}

interface Props {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<Props> = ({ pokemons }) => {
  const { showPokemon } = usePokemonContext();
  return (
    <section className="pt-14 grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-4 gap-y-14">
      {pokemons.map((pokemon) => (
        <PokemonPreview
          key={pokemon.url}
          pokemonURL={pokemon.url}
          onClick={showPokemon}
        />
      ))}
    </section>
  );
};

export default PokemonList;
