import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import AuxWrapper from '../AuxWrapper';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error : null
        };

        componentDidMount(){
            axios.interceptors.request.use((req) => {
                this.clearError();
                return req;
            })
            axios.interceptors.response.use(r => r, error => {
                console.error(error.message);
                this.setState({error: error});
            })
        }
        clearError = () => {
            console.log('withErrorHandler.js clear invokced');
            this.setState({error: null});
        }
        render(){
            return (
                <AuxWrapper>
                    <Modal show={this.state.error} modalClicked={this.clearError}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </AuxWrapper>
            );
        }
    }
}

export default withErrorHandler;