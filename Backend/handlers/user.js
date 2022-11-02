const {userModel}=require('../database/user')
const jwt=require('jsonwebtoken')
const {SECRET}=require('../constants/index')

async function registerUser(req,res,next){
    const {user}=req.body;
    let existingUser=await userModel.findOne({email:user.email})
    try{
        if(existingUser){
            return res.status(404).send({error:'user already exists'})
        }
        let userDoc =  await userModel.create(user);
    
        res.status(201).send({
            message : "user succesfully registered",
            user : userDoc
        })
    }catch(err){
        return res.status(404).send({
             error : "Something Went Wrong"
        })
  }
}

async function loginUser(req,res,next){
    try{
        const {email, password}=req.body
        let user =await User.findOne(
            {email:email},
            {password:1,_id:1,email:1,name:1}
        )

        if(user){
            if(user.password==password){
                let encryptedToken=jwt.sign({
                    id:user._id,
                    email:user.email,
                    name:user.name
                },SECRET)
                console.log(encryptedToken)
                return res.send({
                    token:encryptedToken
                })
            }
            else{
                return res.status(404).send({error:'not match'})
            }
        }
        else{
            return res.status(404).send({
                error : "user Not found"
            })
        }
    }catch(error){
        return res.status(404).send({
            error : "something went wrong"      
        })
    }
}


async function home(req,res,next){
    try {
        return res.send('welcome')

    } catch (error) {
        console.log(error)
    }
}

async function getLoggedInUser(req , res , next){
    const {context} = req;
    if(!context.user){
        res.status(404).send({
            error : "Token not provided"
        })
    }else {
         res.status(200).send({
             data : context.user
         })
    }

}

async function getUser(req , res , next){
    try{
       const {id} = req.params;
       console.log(id);

      let user = await userModel.findById(id);

      console.log(user)
      if(!user){
           return res.status(404).send({
                error : "user not found"
           })
      }

      return res.status(201).send({
            user
      })

    }catch(err){
         res.status(404).send({
            error : "something went wrong"
         })
    }
}

module.exports = {
    registerUser, 
    loginUser,
    getUser,
    home,
    getLoggedInUser,

}