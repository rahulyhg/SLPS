import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axious-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm : {
        name : {
            elementType : 'input',
            elementConfig : {
                type : 'text',
                placeholder : 'enter Name'
            },
            value : ''
        },
        email: {
            elementType : 'input',
            elementConfig : {
                type : 'email',
                placeholder : 'enter E-Mail'
            },
            value : ''
        },
        street : {
            elementType : 'input',
            elementConfig : {
                type : 'text',
                placeholder : 'enter Street'
            },
            value : ''
        },
        postalCode: {
            elementType : 'input',
            elementConfig : {
                type : 'text',
                placeholder : 'enter post code'
            },
            value : ''
        },
        country: {
            elementType : 'input',
            elementConfig : {
                type : 'text',
                placeholder : 'Country'
            },
            value : ''
        },        
        deliveryMethod : {
            elementType : 'select', 
            elementConfig : {
                options : [{value: 'fastest', display: 'Fastest'},
                            {value: 'cheapest', display: 'Cheapest'}]
            },
            value : 'fastest'
            }
        },
        loading : false
    }

    orderDataHandler = (event) => {
        event.preventDefault();
        this.setState({loading : true});

        const orderForm = {};
        for (let identifier in this.state.orderForm){
            orderForm[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            orderData: orderForm
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

    inputChangeHandler = (event, identifier) => {
        console.log(event.target.value);
        const updatedForm = {...this.state.orderForm};
        const updatedElement = {...updatedForm[identifier]};
        updatedElement.value = event.target.value;
        updatedForm[identifier] = updatedElement;
        this.setState({orderForm: updatedForm});
    }
    render(){
        let form = (<form>
            {Object.keys(this.state.orderForm).map(key => {
                return <Input key={key}
                    changed={(event) => this.inputChangeHandler(event, key)}
                    elementType={this.state.orderForm[key].elementType}
                    elementConfig={this.state.orderForm[key].elementConfig}
                    value={this.state.orderForm[key].value}
                    />;
            })}
        {/* <Input label="Email" inputtype='input' type="text" placeholder="Your email" />
        <Input label="Name" inputtype='input' type="text" placeholder="Your name" />
        <Input label="Street" inputtype='input' type="text" placeholder="Your street" />
        <Input label="Postal Code" inputtype='input' type="text" placeholder="Your postal code" /> */}
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