const validate = (schema) => {
    return function(req,res,next){
        const error = schema.validate(req.body, {abortEarly: false});

        if(error){
            const errs = error.details.map(e => ({error: e, message: e.message}));
            return res.status(400).json({
                success: false,
                errors: errs
            });
        }

        next();
    }
}

module.exports = validate;