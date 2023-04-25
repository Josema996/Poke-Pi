
const initialState ={
    pokemons : [],
    types : [],
    detail : []
}

function rootReducer (state= initialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return{
                ...state,
                pokemons:action.payload
            }
        case 'GET_NAME_POKEMONS':
            return{
                ...state,
                pokemons: action.payload
            }

        case 'POST_POKEMONS':
            return{
                ...state,
            }
            
        case 'GET_TYPES':
            return {
                  ...state,
                  types: action.payload,
            }
            
        case 'FILTER_CREATED' :
            const statusFiltered2 = action.payload === 'Created' ? state.pokemons.filter(el => el.createdInDb) : state.pokemons.filter(el => !el.createdInDb)
            return{
                ...state,
                pokemons: action.payload === 'All' ? state.pokemons : statusFiltered2
            }
        
        case "GET_DETAILS":
            return{
                ...state,
                detail: action.payload
            }

        case 'ORDER_BY_NAME':
            const sortedArr = action.payload === 'asc' ?
                state.pokemons.sort(function(a, b) {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function(a, b) {
                    if(a.name > b.name) {
                        return -1;
                    }
                    if(b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    pokemons: sortedArr
                }
        case 'ORDER_BY_ATTACK':
            const sortedAttack = action.payload === 'atasc' ?
                 state.pokemons.sort(function(a, b) {
                    if(a.attack > b.attack) {
                         return 1;
                    }
                    if(b.attack > a.attack) {
                        return -1;
                    }
                         return 0;
                    }) :
                state.pokemons.sort(function(a, b) {
                    if(a.attack > b.attack) {
                        return -1;
                    }
                     if(b.attack > a.attack) {
                        return 1;
                    }
                        return 0;
                    })
                        return {
                            ...state,
                            pokemons: sortedAttack
                        }
                default:
                    return state;
        
    }
}
export default rootReducer;