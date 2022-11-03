import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import Users from '../models/userSchema.js'
import Admins from '../models/adminSchema.js'
import questions, { answers } from '../database/data.js'

/** get all questions */
export async function getQuestions(req, res){
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

/** insert all questinos */
export async function insertQuestions(req, res){
    const {question}=req.body
    let existingQuestion=await Questions.findOne({statement:question.statement})
    try {
        
        //  if(!question.statement || question.options.length!=4 || !question.difficulty || question.optionType || !question.answers) throw new Error('Data Not Provided...!');
        if(existingQuestion){
            throw new Error('Question already exist...!');
        }
        
         Questions.create(question, function(err, data){
             res.json({ msg : "Question Saved Successfully...!"})
         })
 
    } catch (error) {
         res.json({error})
    }
}

/** Delete all Questions */
export async function dropQuestions(req, res){
   try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!"});
   } catch (error) {
        res.json({ error })
   }
}

/** get all result */
export async function getResult(req, res){
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** post all result */
export async function storeResult(req, res){
   try {
        const { username, correct, wrong, score } = req.body;
        if(!username && !score) throw new Error('Data Not Provided...!');

        Results.create({ username, correct, wrong, score }, function(err, data){
            res.json({ msg : "Result Saved Successfully...!"})
        })

   } catch (error) {
        res.json({error})
   }
}

/** delete all result */
export async function dropResult(req, res){
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}
/** get all users */
export async function getUsers(req, res){
    try {
        const r = await Users.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** post all result */
export async function storeUsers(req, res){
    const {user}=req.body
    let existingUser=await Users.findOne({email:user.email})
    try {
        
         if(!user.name || !user.email || !user.password) throw new Error('Data Not Provided...!');
        if(existingUser){
            throw new Error('Data already exist...!');
        }

         Users.create(user, function(err, data){
             res.json({ msg : "Result Saved Successfully...!"})
         })
 
    } catch (error) {
         res.json({error})
    }
 }

/** get all users */
export async function getAdmins(req, res){
    try {
        const r = await Admins.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** post all admin */
export async function storeAdmins(req, res){
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) throw new Error('Data Not Provided...!');

        Admins.create({ name, email, password}, function(err, data){
            res.json({ msg : "Result Saved Successfully...!"})
        })

   } catch (error) {
        res.json({error})
   }
}
