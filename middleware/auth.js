const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next)=>{
  if (req==="OPTIONS"){
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
      res.status(401).json({message:"you have to be loggined"})
    }
    const decodedToken = jwt.verify(token,config.get('jwtSecret'))
    req.user = decodedToken
    next()
  }catch (e){
    res.status(401).json({message:"you have to be loggined"})
  }
}