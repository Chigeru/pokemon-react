import React from "react";
import { useSelector } from "react-redux";
// import ListItem from './thumb'
import ListItem from "./thumb";
import Loading from "../loading/loading";

import classes from "./design/PokeList.module.css";

function List({ FindMatches }) {
  const reduxPokemonList = useSelector((state) => state.pokemonList);

  
  console.log(FindMatches(reduxPokemonList));

  return (
    <div className={classes.listBox}>
      {reduxPokemonList.length === 0 ? (
        <Loading />
      ) : (
        reduxPokemonList.map((pokemonSingleInfo, id) => {
          return <ListItem pokemonInfo={pokemonSingleInfo} key={id} />;
        })
      )}
    </div>
  );

}

export default List;
