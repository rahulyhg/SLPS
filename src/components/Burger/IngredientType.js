import {Enum} from '../../core/Enum';

const IngredientType = new Enum({
    BREADBOTTOM: {value: 0, description: 'bread-bottom'},
    BREADTOP: {value: 1, description: 'bread-top'},
    MEAT: {value: 2, description: 'meat'},
    CHEESE: {value: 3, description: 'cheese'},
    SALAD: {value: 4, description: 'salad'},
    BACON: {value: 5, description: 'bacon'}
});

export default IngredientType;