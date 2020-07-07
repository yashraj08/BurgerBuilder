import React,{ Component } from 'react';
import classes from './contactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler' ;
import * as orderActions from '../../../store/actions/index';
class ContactData extends Component {
    state ={
        orderForm:{
                name:{
                    elementType:'input',
                    elementconfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                }, 
                street: {
                    elementType:'input',
                    elementconfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                }, 
                zipCode: {
                    elementType:'input',
                    elementconfig:{
                        type:'text',
                        placeholder:'ZIP code'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                },
                country: {
                    elementType:'input',
                    elementconfig:{
                        type:'text',
                        placeholder:'country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email: {
                    elementType:'input',
                    elementconfig:{
                        type:'email',
                        placeholder:'Your Email'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                }, 
                deliveryMethod:{
                    elementType:'select',
                    elementconfig:{
                       options:[{value:'fastest',displayValue:'Fastest'},
                       {value:'cheapest',displayValue:'Cheapest'}]
                    },
                    value:'fastest',
                    validation:{},
                    valid:true
                },
        },
        formIsValid: false

    }
    orderHandler =(event) =>{
        event.preventDefault();
      
         const formData={};
         for(let formElId in this.state.orderForm ){
             formData[formElId]=this.state.orderForm[formElId].value;
         }
         //console.log(this.props.price);
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData:formData
        }
        this.props.onOrderBurger(order);
        //console.log(order);
        
    }
    checkValidity(value,rules){
        let isValid = true;
        if(rules.required){
            isValid= isValid && value.trim() !== '';
        }
        if(rules.minLength){
            isValid= isValid && value.length >=rules.minLength;
        }
        if(rules.maxLength){
            isValid= isValid && value.length <=rules.maxLength;
        }

        return isValid;
    }

    inputChangedHandler = (event,inputId) =>{
        const updatedOrderForm={
            ...this.state.orderForm
        };
        const updatedFormData={...updatedOrderForm[inputId]};
        updatedFormData.value=event.target.value;
        updatedFormData.valid=this.checkValidity(updatedFormData.value,updatedFormData.validation);
        updatedFormData.touched=true;
        updatedOrderForm[inputId]=updatedFormData;
        let formIsValid =true;
        for(let inputId in updatedOrderForm){
            formIsValid=formIsValid && updatedOrderForm[inputId].valid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
    }

    render(){
        
        const formElements =[];
        for(let key in this.state.orderForm){
            formElements.push(
                {
                    id:key,
                    config:this.state.orderForm[key]
                }
            );
        } 
        let form=(              
        <form onSubmit={this.orderHandler}>
            {formElements.map(formElement=>(
                <Input key={formElement.id} 
                elementType={formElement.config.elementType} 
                elementconfig={formElement.config.elementconfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>

            ))}
            <button 
            className={[classes.Button,classes.Success].join(' ')}
            onClick={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</button>
        </form>
        )
        if(this.props.loading){
            form=<Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading
    };
};

const mapDispatchToProps =dispatch =>{
    return {
    onOrderBurger:(orderData) => dispatch(orderActions.purchaseBurger(orderData))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));