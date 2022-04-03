const reducer = (state = [], action) => {
    switch (action.type) {
        case 'fillElementList':
            return action.payload;
        default:
            return state;
    }
}

export default reducer;