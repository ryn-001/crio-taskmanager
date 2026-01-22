const validate = (schema) => {
    return function(req,res,next){
        const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: true });

        if(error){
            console.log("JOI ERROR:", error.details);

            const errs = error.details.map((e) => ({field: e.path[0], message: e.message}));
            return res.status(400).json({
                success: false,
                errors: errs
            });
        }

        next();
    }
}

module.exports = validate;