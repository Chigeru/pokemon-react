const reducer = (state = [], action) => {
    switch (action.type) {
        case 'fillPokemonList':
            return action.payload;
        default:
            return state;
    }
}

export default reducer;