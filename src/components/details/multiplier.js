import React from "react";

import { CapitalFirstLetter } from '../../service/helper'

import TabletHeadline from "./InfoTabletTemplate/tabletHeadline";
import TabletContent from "./InfoTabletTemplate/tabletContent";

import classes from './design/ElementsMultiplier.module.css'

function multiplier({ pokemonName, pokemonElements, reduxElement }) {

  function CalculateMultipliers() {
    let damageList = [];
    for (let element of reduxElement) {
      if (element.name === "unknown") break;
      let damageMultiplier = 1;

      //Goes through every type the pokemon have
      for (let pokemonType of pokemonElements) {
        //Checks if the checking type can deal any damage
        if (pokemonType.damage_relations.no_damage_from.length > 0) {
          //Goes through every types the pokemon takes no damage from
          for (let eleND of pokemonType.damage_relations.no_damage_from) {
            if (eleND.name === element.name) {
              damageMultiplier = 0;
            }
          }
        }
        if (damageMultiplier !== null) {
          //Checks if the checking type can deal double damage
          if (pokemonType.damage_relations.double_damage_from.length > 0) {
            //Goes through every types the pokemon is weak against
            for (let eleDD of pokemonType.damage_relations.double_damage_from) {
              if (eleDD.name === element.name) {
                damageMultiplier *= 2;
                break;
              }
            }
          }
          //Checks id the checking type can deal half damage
          if (pokemonType.damage_relations.half_damage_from.length > 0) {
            //Goes through every types the pokemon is strong against
            for (let eleHD of pokemonType.damage_relations.half_damage_from) {
              if (eleHD.name === element.name) {
                damageMultiplier *= 0.5;
                break;
              }
            }
          }
        }
      }
      damageList.push(damageMultiplier);
    }
    return damageList;
  }

  function FractionChecking(multiplier) {
    if (multiplier < 1.0) {
      if (multiplier >= 0.5) return "½";
      else return "¼";
    } else return multiplier;
  }

  function MultiplierStyling(id) {
    let multiplierStyling = classes.damageMultiplierBox;
    multiplierStyling += ' ' + reduxElement[id].name;
    return multiplierStyling;
  }

  return (
    <div>
      <TabletHeadline>Defends multiplier</TabletHeadline>
      <TabletContent>
        <h4>The effectiveness of each damage type against {CapitalFirstLetter(pokemonName)}</h4>
        <div className={classes.multiplierContainer}>
        {CalculateMultipliers().map((multiplier, id) => {
          return (
            <div className={MultiplierStyling(id)} key={reduxElement[id].name}>
              <img  className={classes.pokemonUnitType}
                src={`${process.env.PUBLIC_URL}/images/types/${reduxElement[id].name}.svg`}
                alt=""
                title={CapitalFirstLetter(reduxElement[id].name)}
              /> 
              <p>x{FractionChecking(multiplier)}</p>
            </div>
          );
        })}
        </div>
      </TabletContent>
    </div>
  );
}

export default multiplier;
