import React from 'react';
import classes from './checkoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Aux from '../../../hoc/Aux1/Aux'
const checkoutSummary=(props)=>{
    return(
    //    <div className={classes.CheckoutSummary}>
           <Aux>
                <div className={classes.CheckoutSummary}>
                <h1>We hope it tastes well!</h1>
                </div>
                
           <div style={{ width: '100%', margin:'auto' }} >
               <Burger ingredients={props.ingredients}  style={{width:'100%',margin:'auto'}}/>
           </div>
           <div className={classes.CheckoutSummary}>
           <button className={[classes.Button,classes.Danger].join(' ')} onClick={props.checkoutCancelled}  > CANCEL </button> 
           <button className={[classes.Button,classes.Success].join(' ')} onClick={props.checkoutContinued } > CONTINUE </button> 
           </div>
           </Aux>
          
    //    </div> 
    )
}
export default checkoutSummary;