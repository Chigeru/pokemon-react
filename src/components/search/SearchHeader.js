import React from 'react'

import classes from './design/searchHeader.module.css'

function SearchHeader({ FindMatches }) {

    
  return (
    <header className={classes.searchContainer}>
        <input className={classes.searchArea} type="search" placeholder="Search Pokémon" onChange={(e) => {FindMatches(e.target.value)} } ></input>
        <p className={classes.headerText}>Pokédex</p>
    </header>
  )
}

export default SearchHeader