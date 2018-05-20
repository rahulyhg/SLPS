import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axious-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {updateObject, checkValidity} from '../../../core/Utility/utility';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm : {
        name : {
            elementType : 'input',
            elementConfig : {
                type : 'text',
                autoComplete: 'name',
                placeholder : 'Name'
            },
            value : '',
            validation: {
                required: true,
                maxLength: 50
            },
            errorMessages : [],
            valid : true
        },
        email: {
            elementType : 'input',
            elementConfig : {
                type : 'email',
                autoComplete: 'email',
                placeholder : 'E-Mail',
                pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"
            },
            validation: {
                required : true,
                minLength: 5,
                maxLength:35
            },
            errorMessages : [],
            valid : true,
            value : ''
        },
        street : {
            elementType : 'input',
            elementConfig : {
                type : 'text',
                autoComplete: 'street',
                placeholder : 'Street'
            },
            value : '',
            errorMessages : [],
            validation: {
                maxLength : 50
            },
            valid : true
        },
        postalCode: {
            elementType : 'input',
            elementConfig : {
                type : 'text',
                autoComplete: 'postcode',
                placeholder : 'Post code'
            },
            errorMessages : [],
            validation : {
                minLength : 5,
                maxLength : 10
            },
            valid: true,
            value : ''
        },
        country: {
            elementType : 'input',
            elementConfig : {
                type : 'text',
                placeholder : 'Country',
                autoComplete: 'country'
            },
            errorMessages : [],
            validation: {
                maxLength: 50
            },
            valid : true,
            value : ''
        },        
        deliveryMethod : {
            elementType : 'select', 
            autoComplete: 'delevery-method',
            elementConfig : {
                options : [{value: 'fastest', display: 'Fastest'},
                            {value: 'cheapest', display: 'Cheapest'}]
            },
            value : 'fastest',
            errorMessages : [],
            validation: {
                required: true
            },
            valid:true,
            }
        },
        isFormValid : false,
        isModified : false
    }

    orderDataHandler = (event) => {
        event.preventDefault();
        //this.setState({loading : true});

        const orderForm = {};
        for (let identifier in this.state.orderForm){
            orderForm[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            ingredients : this.props.ings,
            price : this.props.price,
            orderData: orderForm,
            userId: this.props.userId
        };
        this.props.onOrderPlaced(order, this.props.token);
    }

    inputChangeHandler = (event, identifier) => {
        const validationResult = checkValidity(event.target.value, this.state.orderForm[identifier].validation);

        const updatedElement = updateObject(this.state.orderForm[identifier], {
            value : event.target.value,
            valid : validationResult.isValid,
            errorMessages : validationResult.messages
        })

        const updatedForm = updateObject(this.state.orderForm, {
            [identifier] : updatedElement
        });

        const isFormValid = true; //(!this.state.isModified || this.state.isFormValid) && updatedElement.valid;
        console.log('isFormValid', isFormValid)

        this.setState({orderForm: updatedForm, isModified:true, isFormValid : isFormValid});
    }
    render(){
        let form = (<form>
            {Object.keys(this.state.orderForm).map(key => {
                const config = this.state.orderForm[key];
                return <Input key={key}
                    id={key}
                    changed={(event) => this.inputChangeHandler(event, key)}
                    elementType={config.elementType}
                    elementConfig={config.elementConfig}
                    value={config.value}
                    valid={config.valid}
                    errorMessages={config.errorMessages}
                    />;
            })}
        
        <Button btnType="Success" disabled={!this.state.isFormValid}
            clicked={this.orderDataHandler}>ORDER</Button>
        </form>);
        if (this.props.loading){
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

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.orders.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderPlaced: (orderData, token) => dispatch(actions.sendBurgerOrder(orderData, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));