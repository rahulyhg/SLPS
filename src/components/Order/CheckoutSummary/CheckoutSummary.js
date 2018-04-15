import React, {Component} from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
        <h1>Here is your delicious burger</h1>
            <div style={{width:'300px', margin:'auto', display:'block' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled} >CANCEL</Button>
            <Button btnType="Success" 
                clicked={props.checkoutContinue}
                >CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummary;