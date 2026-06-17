// Molécula — tarjeta que muestra la información de un Pokémon individual
// En la web: cada card dentro del grid principal con imagen, tipos y stats
// Atomic Design — molécula, combina los átomos StatBar y TypeIcon
// Principio aplicado: Interface Segregation — recibe solo el Pokemon que necesita

import { type CSSProperties } from "react";
import type { Pokemon } from "../../pokemon/domain/Pokemon";
import { StatBar } from "../atoms/StatBar";
import { TypeIcon } from "../atoms/TypeIcon";

type Props = {
  pokemon: Pokemon;
  typeIcons: Record<string, string>;
};

export const PokemonCard = ({ pokemon, typeIcons }: Props) => {
  const customStyles = {
    "--color-type": `var(--color-${pokemon.types[0].type.name}`,
  } as CSSProperties;

  return (
    <li key={`pokemon-card-${pokemon.id}`}>
      <article className="card" style={customStyles}>
        <header className="card__head">
          <div className="card__tag">
            <p>#{pokemon.id.toString().padStart(3, "0")}</p>
          </div>
          <div className="card__tag">
            <TypeIcon
              typeName={pokemon.types[0].type.name}
              iconSrc={typeIcons[pokemon.types[0].type.name]}
            />
            {pokemon.types[1] && (
              <TypeIcon
                typeName={pokemon.types[1].type.name}
                iconSrc={typeIcons[pokemon.types[1].type.name]}
                variant="secondary"
              />
            )}
          </div>
        </header>
        <img
          className="card__avatar"
          src={pokemon.sprites.other["official-artwork"].front_default}
          loading="lazy"
          alt={`${pokemon.name} artwork`}
        />
        <section className="card__content">
          <h3 className="card__title">{pokemon.name}</h3>
          <ul aria-description="Stats resume">
            <StatBar label="Health points" abbreviation="Hp" value={pokemon.stats[0].base_stat} />
            <StatBar label="Attack" abbreviation="At" value={pokemon.stats[1].base_stat} />
            <StatBar label="Defense" abbreviation="Df" value={pokemon.stats[2].base_stat} />
            <StatBar label="Special attack" abbreviation="SpA" value={pokemon.stats[3].base_stat} />
            <StatBar
              label="Special defense"
              abbreviation="SpD"
              value={pokemon.stats[4].base_stat}
            />
            <StatBar label="Speed" abbreviation="Spd" value={pokemon.stats[5].base_stat} />
          </ul>
        </section>
      </article>
    </li>
  );
};
