import React from "react";

import classes from "./design/PokemonDisplay.module.css";
import {CapitalFirstLetter} from '../../service/helper'

function PokemonDisplay({ name, image, types, id }) {

    let cssName = classes.displayBackground;
    // cssName += ' ' + types[0].type.name;
      return (
        <>
          <div className={cssName}>
            <img className={classes.displayImg} src={image} alt={name} />
            <p className={classes.idText}>#{id}</p>
            <p className={classes.nameText}>{CapitalFirstLetter(name)}</p>
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