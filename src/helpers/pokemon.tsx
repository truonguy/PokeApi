import { getEvolutionsData } from "../services/pokemonServices";
import Pokemons from "../components/Pokemons";

interface Stat {
  name: string;
  base_stat: number;
}

interface Evolution {
  name: string;
  min_level: number;
  image?: string;
  pokemonInfo?: any;
}

const formatStats = (
  stats: { stat: { name: string }; base_stat: number }[]
): Stat[] => {
  const nameTypes: Record<string, string> = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD",
  };

  const newStats: Stat[] = stats.map(({ stat, base_stat }) => ({
    name: nameTypes[stat.name],
    base_stat,
  }));

  newStats.push({
    name: "TOT",
    base_stat: newStats.reduce((acc, stat) => stat.base_stat + acc, 0),
  });

  return newStats;
};

const formatTypes = (types: { type: { name: string } }[]): string[] =>
  types.map((type) => type.type.name);

const formatAbilities = (
  abilities: { ability: { name: string } }[]
): string[] => abilities.map((ability) => ability.ability.name);

const getPokemonDescription = (pokemonSpecie: any): string =>
  pokemonSpecie.flavor_text_entries[1].flavor_text;

const getEvolutions = async (evolutionInfo: any): Promise<Evolution[]> => {
  const evolutions: Evolution[] = [];
  let evolutionData = evolutionInfo.chain;

  do {
    const evoDetails = evolutionData["evolution_details"][0];

    evolutions.push({
      name: evolutionData.species.name,
      min_level: evoDetails?.min_level ?? 1,
    });

    evolutionData = evolutionData.evolves_to[0];
  } while (evolutionData);

  const promises = getEvolutionsData(evolutions);

  try {
    const responses = await Promise.allSettled(promises);
    assignInfoToEvolutions(responses, evolutions);
    console.log(evolutions);
  } catch (err) {
    console.log(err);
  }

  return evolutions;
};

const getImageByPokemon = (sprites: any): string => {
  return (
    sprites.versions["generation-v"]["black-white"].animated.front_default ??
    sprites.versions["generation-v"]["black-white"].front_default
  );
};

const assignInfoToEvolutions = (
  responses: PromiseSettledResult<any>[],
  evolutions: Evolution[]
): void => {
  responses.forEach((response, index) => {
    if (response.status === "fulfilled") {
      evolutions[index].image =
        response.value.data.sprites.versions["generation-v"][
          "black-white"
        ].front_default;
      evolutions[index].pokemonInfo = response.value.data;
    }
  });
};

export {
  formatStats,
  formatTypes,
  formatAbilities,
  getPokemonDescription,
  getEvolutions,
  assignInfoToEvolutions,
  getImageByPokemon,
};
