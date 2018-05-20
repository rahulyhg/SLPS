import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import {updateObject, checkValidity} from '../../core/Utility/utility';
import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls : {
            email: {
                elementType : 'input',
                label: 'Email',
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
                value : '',
                touched : false
            },            
            password : {
                elementType : 'input',
                label: 'Password',
                elementConfig : {
                    type : 'password',
                    autoComplete: 'password',
                    placeholder : 'Password'
                },
                validation: {
                    required : true,
                    minLength: 6,
                },
                errorMessages : [],
                valid : true,
                value : '',
                touched : false
            },            
        },
        isFormValid : true,
        isSignUp : true
    }
    
    inputChangeHandler = (event, controlName) => {

        const validationResult = checkValidity(event.target.value, this.state.controls[controlName].validation);
        const updatedElement = updateObject(this.state.controls[controlName],
            {
                value : event.target.value,
                touched : true,
                valid : validationResult.isValid,
                errorMessages : validationResult.messages
            }
        )

        const updatedControls = updateObject(this.state.controls, {
                [controlName] : updatedElement
            });
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    }
    render(){
        const redirect = this.props.isAuthenticated ? <Redirect to={this.props.redirectPath} /> : null;
        let form = (<form>
            {Object.keys(this.state.controls).map(key => {
                const config = this.state.controls[key];
                return <Input key={key}
                    id={key}
                    changed={(event) => this.inputChangeHandler(event, key)}
                    elementType={config.elementType}
                    elementConfig={config.elementConfig}
                    label={config.label}
                    value={config.value}
                    valid={config.valid}
                    errorMessages={config.errorMessages}
                    />;
            })}
        
        <Button btnType="Success" disabled={!this.state.isFormValid}
            clicked={this.submitHandler}>SUBMIT</Button>
        <Button btnType="Danger" disabled={!this.state.isFormValid}
            clicked={this.switchAuthModeHandler}
            >SWITCH TO {this.state.isSignUp? "SIGN IN" : "SIGN UP"}</Button>
        </form>
            
        );
        if (this.props.loading){
            form = <Spinner />;
        }
        const errorMessage = this.props.error ? <p>{this.props.error.message}</p> : null;

        return(
            <div className={classes.Auth}>
                {redirect}
                {errorMessage}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated: state.auth.token !== null,
        redirectPath : state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email, password, isSignUp) => dispatch(actions.authenticate(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);