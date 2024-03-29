import React from "react";
import { IconX } from "@tabler/icons-react";
import { colorByType } from "../constants/pokemon";
import Evolutions from "./Evolutions";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  description: string;
  abilities: string[];
  stats: { name: string; base_stat: number }[];
  evolutions: { name: string; min_level: number; image: string }[];
}

interface Props {
  showModal: boolean;
  onCloseModal: () => void;
  pokemon: Pokemon | null;
}

const colorByStat: Record<string, string> = {
  HP: "[&>div]:bg-red-500 bg-slate-100",
  ATK: "[&>div]:bg-orange-500 bg-slate-100",
  DEF: "[&>div]:bg-yellow-500 bg-slate-100",
  SpA: "[&>div]:bg-blue-300 bg-slate-100",
  SpD: "[&>div]:bg-green-500 bg-slate-100",
  SPD: "[&>div]:bg-pink-500 bg-slate-100",
  TOT: "[&>div]:bg-blue-500 bg-blue-300",
};

const ModalPokemon: React.FC<Props> = ({
  showModal,
  onCloseModal,
  pokemon,
}) => {
  return (
    <section
      className={`fixed top-0 left-0 right-0 h-screen transition-all
      duration-500
      ${showModal ? "visible opacity-100" : "invisible opacity-0"} 
      ${colorByType[pokemon?.types[0] ?? ""]}`}
    >
      <button
        onClick={onCloseModal}
        className="bg-white absolute top-4 right-4 p-1 rounded-lg hover:opacity-80 transition-opacity"
      >
        <IconX size={25} stroke={4} />
      </button>
      <article
        className={`bg-white h-[85%] absolute w-full  rounded-tl-3xl rounded-tr-3xl text-center transition-all
        duration-500   ${showModal ? "bottom-0" : "-bottom-full"}`}
      >
        <header className="absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <img className="fixelated" src={pokemon?.image} alt="" />
        </header>
        <div className="overflow-y-auto px-4 pt-14 grid gap-2 content-start">
          <span className="text-slate-400 text-sm font-semibold">
            N° {pokemon?.id}
          </span>
          <h2 className="font-bold text-2xl capitalize">{pokemon?.name}</h2>
          <ul className="flex gap-2 justify-center">
            {pokemon?.types.map((type) => (
              <li
                className={`text-sm p-1 text-white rounded-md px-2 ${colorByType[type]}`}
                key={type}
              >
                {type}
              </li>
            ))}
          </ul>
          <div>
            <h4 className="font-bold capitalize">Pokedex Entry</h4>
            <p className="text-slate-400">{pokemon?.description}</p>
          </div>

          <section className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <h4 className="font-bold capitalize">Height</h4>
              <span className="bg-slate-100 block rounded-full p-1">0,7m</span>
            </div>
            <div className="grid gap-2">
              <h4 className="font-bold capitalize">Weight</h4>
              <span className="bg-slate-100 block rounded-full p-1">6,9kg</span>
            </div>
          </section>

          <section className="grid gap-2">
            <h4 className="font-bold capitalize">Abilities</h4>
            <ul className="grid grid-cols-2 gap-4">
              {pokemon?.abilities.map((ability) => (
                <li
                  key={ability}
                  className="bg-slate-100 block rounded-full p-1 capitalize"
                >
                  <span>{ability}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-2">
            <h4>Stats</h4>
            <ul className="flex justify-center gap-3 flex-wrap">
              {pokemon?.stats.map((stat) => (
                <li
                  className={` p-1 rounded-full ${colorByStat[stat.name]}`}
                  key={stat.name}
                >
                  <div className=" bg-green-500 rounded-full w-[28px] aspect-square grid place-content-center">
                    <span className="text-xs text-white">{stat.name}</span>
                  </div>
                  <span className=" font-semibold text-sm">
                    {stat.base_stat}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-2">
            <h4 className="font-bold capitalize">Evolutions</h4>
            <Evolutions evolutions={pokemon?.evolutions ?? []} />
          </section>
        </div>
      </article>
    </section>
  );
};

export default ModalPokemon;
