import React from "react";
import { Link } from "react-router-dom";

import { CapitalFirstLetter } from "../../service/helper";
import classes from "./design/evolution.module.css";

import TabletHeadline from "./InfoTabletTemplate/tabletHeadline";
import TabletContent from "./InfoTabletTemplate/tabletContent";

function evolution({
  evolutionChain,
  reduxPokemonList,
  reduxElementList,
  mainPokemon,
}) {
  console.log(HandleEvolutionChainInformation(evolutionChain.chain));

  const updatedEvolution = HandleEvolutionChainInformation(
    evolutionChain.chain
  );

  function FindChosenPokemon(findPokemon) {
    return reduxPokemonList.find((pokemon) => pokemon.name === findPokemon);
  }

  function HandleEvolutionChainInformation(evolveInfo) {
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
              min_level:
                evolveInfo.evolution_details === undefined
                  ? null
                  : evolveInfo.evolution_details[0].min_level,
              trigger_name:
                evolveInfo.evolution_details === undefined
                  ? null
                  : evolveInfo.evolution_details[0].trigger.name,
              item:
                evolveInfo.evolution_details === undefined
                  ? null
                  : evolveInfo.evolution_details[0].item,
              hold_item:
                evolveInfo.evolution_details === undefined
                  ? null
                  : evolveInfo.evolution_details[0].held_item,
            }
          : null,
      evolves_to: tempEvolution,
    };

    return atmPokemon;
  }

  function componentDidMount() {
    window.scrollTo(0, 0);
  }

  function EvolutionPartLayout(pokemonEvolutionDisplay, count = 1, index = 0) {
    return (
      <>
        <div
          className={classes.evolution_to_box}
          key={pokemonEvolutionDisplay.pokemon.name}
        >
          {pokemonEvolutionDisplay.evolution_details !== null ? (
            <div className={classes.evolutionCondition}>
              {count > 1 ? (
                index < count / 2 ? (
                  <p className={classes.arrowUP} key="arrowUP">
                    {" "}
                  </p>
                ) : (
                  <p className={classes.arrowDOWN}> </p>
                )
              ) : (
                <p className={classes.arrow} key="arrowDOWN">
                  {" "}
                </p>
              )}

              {pokemonEvolutionDisplay.evolution_details.min_level !== null ? (
                <p key="level">
                  Level: {pokemonEvolutionDisplay.evolution_details.min_level}
                </p>
              ) : null}
              {pokemonEvolutionDisplay.evolution_details.trigger_name ===
              "trade" ? (
                <p key="teade">Trade</p>
              ) : null}
              {pokemonEvolutionDisplay.evolution_details.item !== null ? (
                <p key="item">
                  Use{" "}
                  {CapitalFirstLetter(
                    pokemonEvolutionDisplay.evolution_details.item.name
                  )}
                </p>
              ) : null}
              {pokemonEvolutionDisplay.evolution_details.hold_item !== null ? (
                <p key="holding">
                  Holding:{" "}
                  {CapitalFirstLetter(
                    pokemonEvolutionDisplay.evolution_details.hold_item
                  )}
                </p>
              ) : null}
            </div>
          ) : null}
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
                {CapitalFirstLetter(pokemonEvolutionDisplay.pokemon.name)}
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

          <div className={classes.evolution_split}>
            {pokemonEvolutionDisplay.evolves_to.length > 0
              ? (pokemonEvolutionDisplay.evolves_to.map(
                    (evolution1, index) => {
                      return (
                        <div key={evolution1.pokemon.name}>
                          {EvolutionPartLayout(
                            evolution1,
                            pokemonEvolutionDisplay.evolves_to.length,
                            index
                          )}
                        </div>
                      );
                    }
                  ))
              : null}
          </div>
        </div>
      </>
    );
  }
  console.log(updatedEvolution);

  return (
    <div>
      <TabletHeadline>Evolution</TabletHeadline>
      <TabletContent>
        <div className={classes.evolution_to_box}>
          {EvolutionPartLayout(updatedEvolution)}
          {componentDidMount()}
        </div>
      </TabletContent>
    </div>
  );
}

export default evolution;
