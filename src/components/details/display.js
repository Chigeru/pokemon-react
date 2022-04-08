import React from "react";

import classes from "./design/PokemonDisplay.module.css";
import {CapitalFirstLetter, NameAbbreviations} from '../../service/helper'

function PokemonDisplay({ name, image, types, id }) {
      return (
        <>
          <div className={classes.displayBackground}>
            <img className={classes.displayImg} src={image} alt={name} />
            <p className={classes.idText}>#{id}</p>
            <p className={classes.nameText}>{CapitalFirstLetter(NameAbbreviations(name))}</p>
              <div className={classes.elementContainer}>
                {types.map((elementType) => {
                  return (<div key={id + elementType.type.name}>
                    <img
                      className={classes.pokemonUnitType}
                      src={`${process.env.PUBLIC_URL}/images/types/${elementType.type.name}.svg`}
                      alt={elementType.type.name}
                    /> 
                    <p className={classes.elementText}>{CapitalFirstLetter(elementType.type.name)}</p>
                  </div>
                  );
                })}
              </div>
          </div>
        </>
      );
    }
    
    export default PokemonDisplay;