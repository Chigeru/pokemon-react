import React from "react";
import SearchHeader from "../components/search/SearchHeader";
import PokeList from '../components/list/List'

import { useSelector} from "react-redux";

import classes from "./design/pokemonListPage.module.css";

function PokemonListPage() {


  function FindMatches(pokemonsRemain, wordToMatch = '') {
    // return pokemonsRemain.filter((poke) => {
    //   const regex = new RegExp(wordToMatch, "gi");
    //   const regexExactList = new RegExp("^" + wordToMatch, "gi");

    //   return poke.name.match(regexExactList) || poke.id.match(regex);
    // });
    return 'find matches'
  }

  return (
    <>
      <img className={classes.backgroundImage} src={`${process.env.PUBLIC_URL}/images/headerPokeball.svg`} alt='nothing'/>
      <SearchHeader />
      <PokeList FindMatches={FindMatches} />
    </>
  );
}

export default PokemonListPage;
