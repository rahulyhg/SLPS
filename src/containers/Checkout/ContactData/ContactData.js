import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axious-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name : '',
        email: '',
        address : {
            street : '',
            postalCode: ''
        },
        loading : false
    }

    orderDataHandler = (event) => {
        event.preventDefault();
        console.log('orderdataHandler', this.props.ingredients);

        this.setState({loading : true});

        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            customer : {
                name : 'Rajnikant Dankhara',
                address : {
                    street : 'My Street',
                    postCode : 'P134A',
                    country : 'UK'
                },
                email: 'rajnikant.dankhara@gmail.com',
                deliveryMethod: 'fastest'
            }
        };

        axios.post('/orders.json', order)
        .then(response => 
            {
                this.setState({loading:false});
                this.props.history.push("/");
            })
        .catch(error =>{
            this.setState({loading:false});
            console.log(error);
        });
    }

    render(){
        let form = (<form>
        <input className={classes.Input} type="text" placeholder="Your email" />
        <input className={classes.Input} type="text" placeholder="Your name" />
        <input className={classes.Input} type="text" placeholder="Your street" />
        <input className={classes.Input} type="text" placeholder="Your postal code" />
        <Button btnType="Success"
            clicked={this.orderDataHandler}>ORDER</Button>
        </form>);
        if (this.state.loading){
            form = <Spinner />;
        }

    return (

            <div className={classes.ContactData}>
                <h4>Enter your delivery address </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;