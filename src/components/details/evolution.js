import React from "react";

import TabletHeadline from "./InfoTabletTemplate/tabletHeadline";
import TabletContent from "./InfoTabletTemplate/tabletContent";

function evolution({ evolutionChain }) {
  HandleEvolutionChainInformation(evolutionChain.chain);

  function HandleEvolutionChainInformation(
    evolveInfo,
    evolutionArray = [],
    runthrough = 1
  ) {
    evolutionArray.push(`${evolveInfo.species.name} `);
    console.log(`${evolveInfo.species.name} - ${runthrough}`);
    if (evolveInfo.evolves_to.length > 0) {
      //Checks all possible evolutions during this stage
      for (let i = 0; i < evolveInfo.evolves_to.length; i++) {
        //Checks for multiple credentials
        // for (let j = 0; j < evolveInfo.evolves_to[i].evolution_details.length; j++) 
        for(let levelCred of evolveInfo.evolves_to[i].evolution_details)
        {
          
          // if(levelCred.trigger.name !== 'level-up') console.log(levelCred.trigger.name);

          if(levelCred.held_item !== null) console.log('holding: ' + levelCred.held_item.name);
          else if(levelCred.item !== null) console.log('use ' + levelCred.item.name);
          else if (levelCred.min_level !== null) console.log(levelCred.min_level);

          // console.log(levelCred);
            // console.log(evolveInfo.evolves_to[i].evolution_details[j]);
          
        }
        HandleEvolutionChainInformation(
          evolveInfo.evolves_to[i],
          evolutionArray,
          runthrough + 1
        );
      }
    } else {
      // for (let pokemon of evolutionArray) {
      //   fetch(`${api}pokemon/${pokemon}`)
      //   .then((response) => response.json())
      //   .then((data) => {setPokemonEvolution(...pokemonEvolution, data)})
      // }
    }
  }

  return (
    <div>
      <TabletHeadline>Evolution</TabletHeadline>
      <TabletContent></TabletContent>
    </div>
  );
}

export default evolution;
