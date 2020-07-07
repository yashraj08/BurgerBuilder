import React from 'react';
import classes from './burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props)=>{
    let NewIngredient = Object.keys(props.ingredients).map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey+i} type={igKey} />;
        });
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if(NewIngredient.length === 0){
        NewIngredient=<p>Please Start adding Ingredients!</p>
    } 
    //console.log(NewIngredient);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {NewIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;