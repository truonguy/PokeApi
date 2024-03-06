import axios, { AxiosResponse } from "axios";

interface Evolution {
  name: string;
}

const getEvolutionsData = (
  evolutions: Evolution[]
): Promise<AxiosResponse<any>>[] => {
  return evolutions.map(
    async (evolution) =>
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution.name}`)
  );
};

export { getEvolutionsData };
