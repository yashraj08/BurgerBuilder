import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};
export const fetchIngredientsError = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_ERROR
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://my-burger-app-41778.firebaseio.com/ingredients.json")
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(err => {
                dispatch(fetchIngredientsError());
            });
    };
};