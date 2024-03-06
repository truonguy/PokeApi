import React from "react";

interface Evolution {
  name: string;
  min_level: number;
  image: string;
}

interface Props {
  evolutions: Evolution[];
}

const Evolutions: React.FC<Props> = ({ evolutions }) => {
  return (
    <div className="flex justify-center gap-2 items-center flex-wrap">
      {evolutions.map((evolution, index) => (
        <article className="flex gap-2 items-center" key={evolution.name}>
          {index >= 0 && (
            <div className="bg-slate-100 p-1 rounded-full text-sm font-bold">
              <span>lv. {evolution.min_level}</span>
            </div>
          )}
          <button className="hover:bg-slate-100 transition-color rounded-3xl ">
            <img src={evolution.image} alt="" />
          </button>
        </article>
      ))}
    </div>
  );
};

export default Evolutions;
