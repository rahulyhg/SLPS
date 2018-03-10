import React, {Component} from 'react';
import AuxWrapper from '../../hoc/AuxWrapper';

class BurgerBuilder extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <AuxWrapper>
                <div>Burger</div>
                <div>Burger Controls</div>
            </AuxWrapper>
        )
    }
}

export default BurgerBuilder;