const {TOKEN} = require('./../config');

function validateToken(req, res, next) {
    
    let tokenSent = req.headers.session-exam-token;

    if(!tokenSent){
        res.statusMessage = "You need to send the 'session-exam-token'";
        return res.send(401);
    }

    if(TOKEN !== tokenSent){
        res.statusMessage = "The session-exam-token is invalid";
        return res.send(401);
    }

    next();

}

module.exports = validateToken;
