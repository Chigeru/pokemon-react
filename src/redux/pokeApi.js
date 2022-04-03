import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
    reducerPath: "pokemonApi",
    baseQuery: fetchBaseQuery({baseUrl: 'https://pokeapi.co/api/v2/'}),
    endpoints: (builder) => ({
        getPokemonByName: builder.query({
            query: (name) => `pokemon/${name}`
        }),
        getPokemons: builder.query({
            query: () => 'pokemon?limit=100'
        }),
        getPokemonSpecies: builder.query({
            query: (id) => `pokemon-species/${id}`
        }),
        getEvolutionChain: builder.query({
            query: (evolutionNumber) => `evolution-chain/${evolutionNumber}`
        }),
        
    })
});

export const { useGetPokemonByNameQuery, useGetPokemonsQuery, useGetPokemonSpeciesQuery, useGetEvolutionChainQuery} = pokemonApi;