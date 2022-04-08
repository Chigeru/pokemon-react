import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { api } from "../service/helper";

import classes from "./design/pokemonDetailedPage.module.css";

import Loading from "../components/loading/loading";

import Display from "../components/details/display";
import Description from "../components/details/description";
import Stats from "../components/details/stats";
import Multipliers from "../components/details/multiplier";
import Abilities from '../components/details/abilities'
import Evolution from "../components/details/evolution";

function PokemonDetailedPage() {
  const params = useParams();
  const reduxPokemonList = useSelector((state) => state.pokemonList);
  const reduxElementList = useSelector((state) => state.elementTypesList);
  const chosenPokemon = FindChosenPokemon();
  const pokemonsElements = FindChosenPokemonElements();
  const pokemonSpecies = useRef();
  const [pokemonEvolution, setPokemonEvolution] = useState();

  /* ---------------- Data check ----------------------*/

  if (true) {
    // console.log(params.infoId);
    // console.log("chosenPokemon:");
    // console.log(chosenPokemon);
    // console.log("Species");
    // console.log(pokemonSpecies.current);
    // console.log("Evolution");
    // console.log(pokemonEvolution);
    // console.log("Elements");
    // console.log(pokemonsElements);
    // console.log('redux - ElementList');
    // console.log(reduxElementList);
    console.log("------------------------------------------");
  }

  //Fill informations for species & evolution when chosenPokemon changes
  useEffect(() => {
    function FetchSpecies() {
      if (chosenPokemon !== 0) {
        fetch(`${api}/pokemon-species/${chosenPokemon.id}`)
          .then((response) => response.json())
          .then((data) => {
            pokemonSpecies.current = data;
            FetchEvolution(data.evolution_chain.url);
            return data;
          });
      } else return 0;
    }
  
    function FetchEvolution(url) {
      fetch(`${url}`)
        .then((response) => response.json())
        .then((data) => {
          setPokemonEvolution(data);
          return data;
        });
    }
    FetchSpecies();
  }, [chosenPokemon])

  //Find the chosen pokemon from all of the pokemons stored in redux
  function FindChosenPokemon() {
    if (reduxPokemonList.length > 0) {
      return reduxPokemonList.find((pokemon) => pokemon.name === params.infoId);
    } else return 0;
  }

  function FindChosenPokemonElements() {
    if (reduxElementList.length > 0 && chosenPokemon !== 0) {
      let elementList = [];
      for (let i = 0; i < chosenPokemon.types.length; i++) {
        elementList.push(
          reduxElementList.find(
            (element) => element.name === chosenPokemon.types[i].type.name
          )
        );
      }
      return elementList;
    } else return 0;
  }

  

  //For description section
  function FlavorTextFindChosenLanguage() {
    return pokemonSpecies.current.flavor_text_entries.find(
      (flavortext) => flavortext.language.name === "en"
    ).flavor_text;
  }

  if (pokemonEvolution !== undefined && reduxElementList.length !== 0) {
    return (
      <>
        <img
          className={classes.backgroundImage}
          src={`${process.env.PUBLIC_URL}/images/headerPokeball.svg`}
          alt=""
        />
        <div className={classes.center_content_container}>
        <Display
          name={chosenPokemon.species.name}
          image={chosenPokemon.sprites.other["official-artwork"].front_default}
          types={chosenPokemon.types}
          id={chosenPokemon.id}
        />
        <div className={classes.informationBoxesContainer}>
          <Description
            id={chosenPokemon.id}
            pokemonName={chosenPokemon.species.name}
            types={chosenPokemon.types}
            generation={pokemonSpecies.current.generation}
            weight={chosenPokemon.weight}
            height={chosenPokemon.height}
            abilities={chosenPokemon.abilities}
          />
          <Stats stats={chosenPokemon.stats} />
          <Multipliers
            pokemonName={chosenPokemon.name}
            pokemonElements={pokemonsElements}
            reduxElement={reduxElementList}
          />
          <Abilities chosenPokemon={chosenPokemon} />
          <Evolution evolutionChain={pokemonEvolution} reduxPokemonList={reduxPokemonList} mainPokemon={chosenPokemon}/>
        </div>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <img
          className={classes.backgroundImage}
          src={`${process.env.PUBLIC_URL}/images/headerPokeball.svg`}
          alt=""
        />
        <Loading />
      </div>
    );
  }
}

export default PokemonDetailedPage;
