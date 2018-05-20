import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import AuxWrapper from '../AuxWrapper';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error : null
        };

        componentWillMount(){
            this.requestInterceptor = axios.interceptors.request.use((req) => {
                this.clearError();
                return req;
            })
            this.responseInterceptor = axios.interceptors.response.use(r => r, error => {
                console.error(error.message);
                this.setState({error: error});
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        clearError = () => {
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