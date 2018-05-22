import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationIems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import Urls from '../../../core/Urls';

configure({adapter: new Adapter()});

describe("<NavigationIems />", () => {

    let wrapper = null;
    beforeEach(()=> {
        wrapper = shallow(<NavigationIems />);
    })

    it("Give user is not authenticated then it should render two <NavigationItem />", () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it("should render three <NavigationItem /> when user is authenticated.", () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it("should render Logout if authenticated", ()=> {
        wrapper.setProps({isAuthenticated : true});
        expect(wrapper.contains(<NavigationItem link={Urls.logout}>Logout</NavigationItem>)).toEqual(true);
    })
});