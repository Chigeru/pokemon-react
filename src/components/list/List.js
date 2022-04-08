import React from "react";
import ListItem from "./thumb";
import Loading from "../loading/loading";

import classes from "./design/PokeList.module.css";

function List({ pokemonList }) {
  
  return (
    <div className={classes.listBox}>
      {pokemonList.length === 0 ? (
        <Loading />
      ) : (
        pokemonList.map((pokemonSingleInfo, id) => {
          return <ListItem pokemonInfo={pokemonSingleInfo} key={id} />;
        })
      )}
    </div>
  );

}

export default List;
