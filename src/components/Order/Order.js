import React from 'react';
import classes from './order.module.css';
const order= (props) =>{
    const ingredients=[];
    for(let ingName in props.ingredients){
        ingredients.push({
            Name: ingName,
            amount: props.ingredients[ingName]
        });

    }
    const ingredientOutput = ingredients.map(ig=>{
        return <span
        style={{
         textTransform:'capitalize',
         display:'inline-block',margin:'0 8px',
         border:'1px solid #ccc',
         padding: '5px' 
        }}
        key={ig.Name}> {ig.Name} ({ig.amount})</span>
    })
    return  (
    <div className={classes.Order}>

        <p>Ingredients:{ingredientOutput} </p>
        <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
    );
}
export default order;