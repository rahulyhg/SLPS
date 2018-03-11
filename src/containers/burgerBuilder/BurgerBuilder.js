import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import AuxWrapper from '../../hoc/AuxWrapper';

class BurgerBuilder extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <AuxWrapper>
                <Burger />
                <div>Burger Controls</div>
            </AuxWrapper>
        )
    }
}

export default BurgerBuilder;