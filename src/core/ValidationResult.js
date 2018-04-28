class ValidationResult{
    static validResult = new ValidationResult(true, '');

    constructor(isValid, messages){
        this.isValid = isValid;
        this.messages = messages;
    }
}

export default ValidationResult;