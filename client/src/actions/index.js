import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){
        try{
            const json = await axios.get("http://localhost:3001/pokemons");
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
        }catch(error){
            console.log(error)
        }
    }
}
export function getPokemonsTypes(){
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/types");
            return dispatch({
                type: 'GET_TYPES',
                payload: json.data
            })
        }catch (error) {
            console.log(error)
        }
    }
};

export function postPokemon(payload){
    return async function (dispatch){
        const response = await axios.post("http://localhost:3001/pokemons",payload)
        console.log(response)
        return response;
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return{

        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByAttack(payload){
    return{

        type:'ORDER_BY_ATTACK',
        payload
    }
}

export const getNamePokemons = (name) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/${name}`)
            .then(response => {
                const pokemons = response.data;
                dispatch({
                    type: 'GET_NAME_POKEMONS',
                    payload: pokemons
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export function getDetail(id){
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/pokemons/${id}`);
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}
