import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { api } from "./service/helper";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./redux/actionCombiner";
import { actionCreatorElement } from "./redux/actionCombinerElement";

import PokemonListPage from "./pages/pokemonListPage";
import PokemonDetailPage from "./pages/pokemonDetailedPage";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { fillPokemonList } = bindActionCreators(actionCreators, dispatch);
  const { fillElementList } = bindActionCreators(actionCreatorElement, dispatch);

  const loadPokemons = async (data) => {
    let pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonDetails = await getInfoFromUrl(pokemon.url);
        return pokemonDetails;
      })
    );
    fillPokemonList(pokemonData);
  };

  const loadElements = async (data) => {
    let elementData = await Promise.all(
      data.map(async (element) => {
        let elementDetails = await getInfoFromUrl(element.url);
        return elementDetails;
      })
    );
    fillElementList(elementData);
  };

  useEffect(() => {
    async function fetchData() {
      let response = await getInfoFromUrl(`${api}/pokemon?limit=300`);
      await loadPokemons(response.results);
      let elementResponse = await getInfoFromUrl(`${api}/type`);
      await loadElements(elementResponse.results);
    }

    fetchData();
  }, []);

  async function getInfoFromUrl(url) {
    return new Promise((resolve) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        });
    });
  }

  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<PokemonListPage />} />
        <Route path="/:infoId" element={<PokemonDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
