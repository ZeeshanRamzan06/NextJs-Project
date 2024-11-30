import { sendEmailVerification } from "@/helpers/sendEmailVerification";
import dbConnection from "@/lib/dbConnection";
import UserModel from "@/models/User";
import bcrypt from 'bcrypt';

export async function POST(request:Request){
    await dbConnection()
    try {
        const {username,email,password} = await request.json()
        const existingUserVerifyByusername = await UserModel.findOne({
            username,
            isVerrified:true
        })
        if (existingUserVerifyByusername) {
            return Response.json({
                success:false,
                message:'User Already exist'
            },{status:400})
        }
        const existingUserByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random()*9000).toString()
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success:false,
                    message:'User already exist with this email'
                },{status:400})
            }else{
                const hashedpassword = await bcrypt.hash(password,10)
                existingUserByEmail.password = hashedpassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyExpiryCode =new Date(Date.now()+3600000)
                await existingUserByEmail.save()
            }
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours()+1)
            const newUser = new UserModel ({
                username,
                email,
                password: hashedPassword, 
                verifyCode,
                verifyExpiryCode: expiryDate,
                isVerified:false,
                isAcceptedMessage:true,
                messages:[]
            })

            await newUser.save()
        }

        const emailResponce = await sendEmailVerification(
            email,
            username,
            verifyCode
        )
        if (!emailResponce.success) {
            return Response.json({
                success:false,
                message:emailResponce.message
            },{status:500})
            
        }
        return Response.json({
            success:true,
            message:'User Register Successfully.Please Verify your email'
        }, {status: 201}) 

    } catch (error) {
        console.error('Somthing went to wrong',error)
        return Response.json({
                success:false,
                message:'Registering Error'
        })
    }
}