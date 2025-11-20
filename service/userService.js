import User from '../model/userModel.js'
import bcrypt from "bcryptjs"

export const userResgisterServices=async(data)=>{
    const userExist=await User.findOne({email:data.email})
    if(userExist){
        throw new Error("User already exist",400)
    }
    const hashPassword=await bcrypt.hash(data.password,10)
    const newUser=new User({
        name:data.name,
        email:data.email,
        password:hashPassword,
       
    });
    const savedUser=await newUser.save()
    return savedUser._id;
}


export const userLoginServices=async(email,password)=>{
    const userData=await User.findOne({email})
    if(!userData){
        throw new Error("Invalid email or Password",401)
    }
    const isMatch=await bcrypt.compare(password,userData.password)
    if(!isMatch){
        throw new Error("Invalid Email or Password",401)
    }
   
    return userData
}

export const logoutUserService=async()=>{
    return true;
}
