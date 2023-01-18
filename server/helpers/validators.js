
module.exports.errorsValidator = (errors=[]) => {
    const paramsWithErrors = [...new Set(errors.map(error => error.param))];
    const errorObjects = { };
    for (const param of paramsWithErrors) {
        errorObjects[param] = errors
            .filter(error => error.param === param)
            .map(error => error.msg);
    }
    return errorObjects;
}
