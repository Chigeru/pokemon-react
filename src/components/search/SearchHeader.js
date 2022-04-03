import React from 'react'

import classes from './design/searchHeader.module.css'

function SearchHeader() {

    
  return (
    <header className={classes.searchContainer}>
        <input className={classes.searchArea} type="search" placeholder="Search Pokémon" ></input>
        <p className={classes.headerText}>Pokédex</p>
    </header>
  )
}

export default SearchHeader