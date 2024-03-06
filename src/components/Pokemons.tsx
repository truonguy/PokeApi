import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface Pokemon {
  name: string;
}

const INITIAL_LIMIT = 40;
const INCREASE_LIMIT = 20;

const Pokemons: React.FC = () => {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [limit, setLimit] = useState<number>(INITIAL_LIMIT);

  const targetObserver = useRef<HTMLSpanElement>(null);
  const entry = useIntersectionObserver(targetObserver, {});
  const isVisible = !!entry?.isIntersecting;

  const pokemonsByName = allPokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const handleChangePokemonName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPokemonName(e.target.value.toLowerCase());

  useEffect(() => {
    axios
      .get<{ results: Pokemon[] }>(
        "https://pokeapi.co/api/v2/pokemon?limit=898"
      )
      .then(({ data }) => setAllPokemons(data.results))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const maxPokemons = pokemonsByName.length;
    if (isVisible && maxPokemons !== 0) {
      const newLimit = limit + INCREASE_LIMIT;
      newLimit > maxPokemons ? setLimit(maxPokemons) : setLimit(newLimit);
    }
  }, [isVisible, pokemonsByName.length]);

  useEffect(() => {
    setLimit(INITIAL_LIMIT);
  }, [pokemonName]);

  return (
    <section className="p-4 py-5">
      <form>
        <div className="bg-white p-4 flex rounded-2xl text-lg">
          <input
            className="outline-none flex-1"
            type="text"
            autoComplete="off"
            placeholder="Search your Pokemon"
            name="pokemonName"
            onChange={handleChangePokemonName}
          />
          <button
            type="button"
            className="bg-red-500 p-2 rounded-xl shadow-lg shadow-red-500/50 hover:bg-red-400 transition-colors"
          >
            <IconSearch color="white" stroke={3} />
          </button>
        </div>
      </form>
      <PokemonList pokemons={pokemonsByName.slice(0, limit)} />

      {/* Target Observer */}
      <span ref={targetObserver}></span>
    </section>
  );
};
export default Pokemons;
