// import { createStore } from 'redux';
// import reducers from './reducer/index';

// const store = createStore(
//     reducers,
//     {}
// )

// export default store;

import { configureStore } from '@reduxjs/toolkit'
// import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './pokeApi'

export const store = configureStore ({
    reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },

    middleware: (getDefaultMiddle) => getDefaultMiddle().concat(pokemonApi.middleware),
});

// setupListeners(store.dispatch)