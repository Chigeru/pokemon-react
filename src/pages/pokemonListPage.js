import React, {useState, useEffect} from "react";
import SearchHeader from "../components/search/SearchHeader";
import PokeList from '../components/list/List'

import { useSelector} from "react-redux";

import classes from "./design/pokemonListPage.module.css";

function PokemonListPage() {

  const reduxPokemonList = useSelector((state) => state.pokemonList);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  

  useEffect(() => {
    setFilteredPokemonList(reduxPokemonList);
  },[reduxPokemonList])

  function FindMatches(wordToMatch = '') {
    let test = reduxPokemonList.filter((poke) => {
      const regexExactList = new RegExp("^" + wordToMatch, "gi");
      return poke.name.match(regexExactList); 
    })
    setFilteredPokemonList(test);
  }

  

  return (
    <>
      <img className={classes.backgroundImage} src={`${process.env.PUBLIC_URL}/images/headerPokeball.svg`} alt='nothing'/>
      <SearchHeader  FindMatches={FindMatches}/>
      <div className={classes.center_content_container}>
      <PokeList pokemonList={filteredPokemonList}/>
      </div>
    </>
  );
}

export default PokemonListPage;
