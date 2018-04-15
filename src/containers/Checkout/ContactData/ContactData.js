import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name : '',
        email: '',
        address : {
            street : '',
            postalCode: ''
        }
    }

    render(){
        return (
            <div className={classes.ContactData}>
                <h4>Enter your delivery address </h4>
                <form>
                    <input className={classes.Input} type="text" placeholder="Your email" />
                    <input className={classes.Input} type="text" placeholder="Your name" />
                    <input className={classes.Input} type="text" placeholder="Your street" />
                    <input className={classes.Input} type="text" placeholder="Your postal code" />
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;