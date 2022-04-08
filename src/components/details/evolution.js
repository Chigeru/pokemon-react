import React from "react";
import { Link } from "react-router-dom";

import { CapitalFirstLetter, NameAbbreviations } from "../../service/helper";
import classes from "./design/evolution.module.css";

import TabletHeadline from "./InfoTabletTemplate/tabletHeadline";
import TabletContent from "./InfoTabletTemplate/tabletContent";

function evolution({evolutionChain, reduxPokemonList, mainPokemon}) {

  const updatedEvolution = HandleEvolutionChainInformation(evolutionChain.chain);

  function FindChosenPokemon(pokeName) {
    return reduxPokemonList.find((pokemon) => pokemon.species.name === pokeName);
  }

  function HandleEvolutionChainInformation(evolveInfo) {

    //Adds the evolutions from last evolution to first into the list, since all the last evolutions starts from one pokemon
    let tempEvolution = [];
    if (evolveInfo.evolves_to.length > 0) {
      for (let i = 0; i < evolveInfo.evolves_to.length; i++) {
        tempEvolution.push(
          HandleEvolutionChainInformation(evolveInfo.evolves_to[i])
        );
      }
    }

    let atmPokemon = {
      pokemon: FindChosenPokemon(evolveInfo.species.name),
      evolution_details:
        evolveInfo.evolution_details.length > 0
          ? {
              min_level: evolveInfo.evolution_details === undefined ? null : evolveInfo.evolution_details.find((levelReq) => levelReq.min_level !== null),
              trigger_name: evolveInfo.evolution_details === undefined ? null : evolveInfo.evolution_details[0].trigger.name,
              item: evolveInfo.evolution_details === undefined ? null : evolveInfo.evolution_details.find((itemReq) => itemReq.item !== null),
              hold_item: evolveInfo.evolution_details === undefined ? null : evolveInfo.evolution_details.find((heldReq) => heldReq.held_item !== null),
              min_happiness : evolveInfo.evolution_details === undefined ? null :  evolveInfo.evolution_details.find((happyReq) => happyReq.min_happiness !== null),
              time_of_day: evolveInfo.evolution_details === undefined ? null :  evolveInfo.evolution_details.find((timeReq) => timeReq.time_of_day !== ''),
              affection: evolveInfo.evolution_details === undefined ? null :  evolveInfo.evolution_details.find((affectionReq) => affectionReq.min_affection !== null),
              known_move_type: evolveInfo.evolution_details === undefined ? null :  evolveInfo.evolution_details.find((moveTypeReq) => moveTypeReq.known_move_type !== null),
            }
          : null,
      evolves_to: tempEvolution,
    };

    return atmPokemon;
  }

  function componentDidMount() {
    window.scrollTo(0, 0);
  }

  function EvolutionPartLayoutUpdated(pokemonEvolutionDisplay, count = 1, index = 0) {
    return (
      <>
          {pokemonEvolutionDisplay.evolution_details !== null ? (
            <div className={classes.evolutionCondition}>
              {count > 1 ? (index < count / 2 ? <p className={classes.arrowUP} key="arrowUP"></p> : <p className={classes.arrowDOWN}> </p>) : (<p className={classes.arrow} key="arrow"></p> )}
              <div>
              {pokemonEvolutionDisplay.evolution_details.min_level !== undefined ? ( <p key="level"> Level: {pokemonEvolutionDisplay.evolution_details.min_level.min_level}</p>) : null}
              {pokemonEvolutionDisplay.evolution_details.trigger_name === "trade" ? (<p key="teade">Trade</p>) : null}
              {pokemonEvolutionDisplay.evolution_details.item !== undefined ? (<p key="item">Use{" "}{CapitalFirstLetter(pokemonEvolutionDisplay.evolution_details.item.item.name).replaceAll("-", " ")}</p>) : null}
              {pokemonEvolutionDisplay.evolution_details.hold_item !== undefined ? (<p key="holding">Holding:{" "}{CapitalFirstLetter(pokemonEvolutionDisplay.evolution_details.hold_item.held_item.name.replaceAll("-", " "))}</p>) : null}
              {pokemonEvolutionDisplay.evolution_details.min_happiness !== undefined ? (<p key="happiness">min. Happiness:{" "}{pokemonEvolutionDisplay.evolution_details.min_happiness.min_happiness}</p>) : null}
              {pokemonEvolutionDisplay.evolution_details.time_of_day !== undefined ? (<p key="time">during{" "}{CapitalFirstLetter(pokemonEvolutionDisplay.evolution_details.time_of_day.time_of_day)}</p>) : null}
              {pokemonEvolutionDisplay.evolution_details.affection !== undefined ? (<p key="affection">min. Affection:{" "}{pokemonEvolutionDisplay.evolution_details.affection.min_affection}</p>) : null}
              {pokemonEvolutionDisplay.evolution_details.known_move_type !== undefined ? (<p key="knownMoveType">knowing{" "}{CapitalFirstLetter(pokemonEvolutionDisplay.evolution_details.known_move_type.known_move_type.name)}{" "} move</p>) : null}
              </div>
            </div>
          ) : null}

          {/* Displays pokemon informations */}
          <Link to={`/${pokemonEvolutionDisplay.pokemon.name}`}>
            <div className={classes.evolutionDetailedInfo}>
              <img
                className={classes.evolutionPicture}
                src={
                  pokemonEvolutionDisplay.pokemon.sprites.other[
                    "official-artwork"
                  ].front_default
                }
                alt=""
              />
              <p
                className={classes.evolution_Text_Id}
                key={`id: ${pokemonEvolutionDisplay.pokemon.id}`}
              >
                #{pokemonEvolutionDisplay.pokemon.id}
              </p>
              <p
                className={classes.evolution_Text_Name}
                key={`evolution: ${pokemonEvolutionDisplay.pokemon.name}`}
              >
                {CapitalFirstLetter(NameAbbreviations(pokemonEvolutionDisplay.pokemon.species.name))}
              </p>
              <div className={classes.evolution_Types}>
                {pokemonEvolutionDisplay.pokemon.types.map((element) => {
                  return (
                    <p
                      className={classes.evolution_Text_Types}
                      key={`type: ${element.type.name} - ${pokemonEvolutionDisplay.pokemon.name}`}
                    >
                      {CapitalFirstLetter(element.type.name)}
                    </p>
                  );
                })}
              </div>
            </div>
          </Link>

          
          {pokemonEvolutionDisplay.evolves_to.length > 0 ? (
            pokemonEvolutionDisplay.evolves_to.length > 1 ? (
              <span className={classes.evolution_split}>
              {pokemonEvolutionDisplay.evolves_to.map(
                (evolution1, index) => {
                  return (
                    <div className={classes.evolution_to_box} key={index}>
                      {EvolutionPartLayoutUpdated(
                        evolution1,
                        pokemonEvolutionDisplay.evolves_to.length,
                        index
                      )}
                    </div>
                  );
                }
              )}
                </span>
            ) : ( EvolutionPartLayoutUpdated(pokemonEvolutionDisplay.evolves_to[0], 1,0) )
          ) : null}
      </>
    );
  }



  return (
    <div>
      <TabletHeadline>Evolution</TabletHeadline>
      <TabletContent>
        <div className={classes.evolution_to_box}>
          {EvolutionPartLayoutUpdated(updatedEvolution)}
          {componentDidMount()}
        </div>
      </TabletContent>
    </div>
  );
}

export default evolution;
