const auth = (req,res,next) => {
    let token = req.cookies.token;
    if(!token) return res.status(401).json({message: 'User not authenticated'});

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = decode;
        next();
    }catch(e){
        return res.status(401).json({message: e.message});
    }
}

module.exports = auth;