import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter : new Adapter()});

describe("<BurgerBuilder /> Tests", ()=> {
    let wrapper = null;
    beforeEach(()=> {
        wrapper = shallow(<BurgerBuilder 
            onSetAuthRedirect={(path)=> {}}
            onInitIngredients={()=> {}}
         />);
    });

    it("should render BuildControls when ingredient is received.", ()=> {
        wrapper.setProps({ings: {salad: 1}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});
