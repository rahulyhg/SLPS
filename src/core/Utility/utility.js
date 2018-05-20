export const updateObject = (oldObject, updatedProperties ) => {
    // const copiedObject =  Object.create(oldObject);
    // const udpatedObject = Object.assign(oldObject, updatedProperties);
    // return updateObject;

    return {
        ...oldObject,
        ...updatedProperties
    };
}