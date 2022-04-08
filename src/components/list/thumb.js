import React from "react";
import { CapitalFirstLetter, ThreeDigitNumber } from "../../service/helper";
import { Link } from 'react-router-dom'

import classes from "./design/PokeListItems.module.css";

function PokeListItem({ pokemonInfo }) {
  let informationBox = classes.informationBox;
  informationBox += " " + pokemonInfo.types[0].type.name;

  return (
    <Link to={`/${pokemonInfo.name}`}>
    <div className={informationBox}>
      <img
        className={classes.pokemonUnitImage}
        src={pokemonInfo.sprites.other["official-artwork"].front_default}
        alt=""
        key={pokemonInfo.id}
      />
      <div className={classes.shortInformations}>
        <p className={classes.pokemonUnitName}>
          {CapitalFirstLetter(pokemonInfo.species.name.replaceAll("-", " "))}
        </p>
        <div className={classes.typesContainer}>
          <div>
            {pokemonInfo.types.map((elementType) => {
              return (
                <img className={classes.pokemonUnitType} src={`${process.env.PUBLIC_URL}/images/types/${elementType.type.name}.svg`} alt={elementType.type.name} key={pokemonInfo.id + elementType.type.name} />
              );
            })}
          </div>
          <p className={classes.pokemonUnitNumber}>
            #{ThreeDigitNumber(pokemonInfo.id)}
          </p>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default PokeListItem;
