import React from "react";

import { CapitalFirstLetter } from "../../service/helper";

import TabletHeadline from "./InfoTabletTemplate/tabletHeadline";
import TabletContent from "./InfoTabletTemplate/tabletContent";

// import classes from './design/CategoryGeneralStyling.module.css'

function Description({ id, pokemonName, types, generation, weight, height, abilities }) {
  
  function AboutTypes() {
    let typeString = ''
    for(let i = 0; i < types.length; i++) {
      if(i > 0) {
        typeString += '/'
      }
      typeString += types[i].type.name;
    }
    return typeString;
  }
  
  function ConvertHeight() {
    return height
  }
  

  function ConvertWeight() {
    return (weight / 0.45359237 /10).toFixed(1);
  }

  // function calcGeneration() {
  //   let romanianNumbers = {'i': 1, 'v': 5, 'x': 10, 'l': 50};
  //   let generationNumber = generation.name.split('-')[1];
  //   let sum = 0;
    
  // }
  
  return (
    <div>
      <TabletHeadline>About</TabletHeadline>
      <TabletContent>
        <p>{CapitalFirstLetter(pokemonName)} is a {AboutTypes()} type Pokémon introduced in generation {generation.name.split('-')[1].toUpperCase()}</p>
        <table>
          <tbody>
            <tr>
              <th>National nr.</th>
              <td>#{id}</td>
            </tr>
            <tr>
              <th>{types.length > 1 ? 'Types' : 'Type'}</th>
              <td>
              {types.map((element) => <p key={element.type.name}>{CapitalFirstLetter(element.type.name)}</p>)}
              </td>
            </tr>
            <tr>
              <th>Height</th>
              <td>{height >= 10 ? ((height/10)+'m') : (height*10)+'cm'}</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{weight >= 10 ? ((weight/10)+'kg') : (weight*10)+'g'} ({ConvertWeight() + 'lbs'})</td>
            </tr>
            <tr>
              <th>Abilities</th>
              <td>
                {" "}
                {abilities.map((move) => {
                  return (
                  <p key={move.ability.name}>
                    {CapitalFirstLetter(move.ability.name)}
                    {move['is_hidden'] ? ' - (Hidden Ablility)' : ''}
                  </p>);
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </TabletContent>
    </div>
  );
}

export default Description;
