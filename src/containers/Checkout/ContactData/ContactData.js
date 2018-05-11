import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axious-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import ValidationResult from '../../../core/ValidationResult';

class ContactData extends Component {
    state = {
        orderForm : {
        name : {
            elementType : 'input',
            elementConfig : {
                type : 'text',
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
                placeholder : 'E-Mail'
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
                placeholder : 'Country'
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
        loading : false,
        isFormValid : false,
        isModified : false
    }

    orderDataHandler = (event) => {
        event.preventDefault();
        this.setState({loading : true});

        const orderForm = {};
        for (let identifier in this.state.orderForm){
            orderForm[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            ingredients : this.props.ings,
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

    checkValidity = (value, rules) => {
        let valid = true;
        let errorMessages = [];

        if (!rules){
            return ValidationResult.valid;
        }

        if (rules.required){
            valid = valid && value.trim() !== '';
            if (!valid){
                errorMessages.push('Required.');
            }
        }

        if (rules.minLength){
            valid = valid && value.length >= rules.minLength;
            if (!valid){
                errorMessages.push(`Minimum ${rules.minLength} character required.`);
            }
        }

        if (rules.maxLength){
            valid = valid && value.length <= rules.maxLength;
            if (!valid){
                errorMessages.push(`Maximum ${rules.minLength} character allowed.`);
            }
        }

        return new ValidationResult(valid, errorMessages);
    }

    inputChangeHandler = (event, identifier) => {
        const updatedForm = {...this.state.orderForm};
        const updatedElement = {...updatedForm[identifier]};
        updatedElement.value = event.target.value;
        const validationResult = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.valid = validationResult.isValid;
        updatedElement.errorMessages = validationResult.messages;
        updatedForm[identifier] = updatedElement;
        
        const isFormValid = (!this.state.isModified || this.state.isFormValid) && updatedElement.valid;
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

const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price : state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData);