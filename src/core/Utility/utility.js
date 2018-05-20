import ValidationResult from '../ValidationResult';

export const updateObject = (oldObject, updatedProperties ) => {
    // const copiedObject =  Object.create(oldObject);
    // const udpatedObject = Object.assign(oldObject, updatedProperties);
    // return updateObject;

    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let valid = true;
    let errorMessages = [];

    if (!rules){
        return ValidationResult.valid;
    }

    if (rules.required){
        valid = valid && value.trim() !== '';
        if (!valid){
            errorMessages.push('Required.');
            console.log('failed @ required');
        }
    }

    if (rules.minLength){
        valid = valid && value.length >= rules.minLength;
        if (!valid){
            errorMessages.push(`Minimum ${rules.minLength} character required.`);
            console.log('failed min length validation');
        }
    }

    if (rules.isEmail) {
        const pattern = '';
        valid = pattern.test(value) && valid;
        errorMessages.push('Invalid email pattern.');
        console.log('failed email validation');
    }
    if (rules.maxLength){
        console.log(`value.length ${value.length}`);
        valid = valid && value.length <= rules.maxLength;
        if (!valid){
            errorMessages.push(`Maximum ${rules.maxLength} character allowed. But you entered ${value.length}`);
            console.log('failed max length validation');
        }
    }
    if (!valid){
        console.log(value, 'is not valid')
    }
    return new ValidationResult(valid, errorMessages);
};