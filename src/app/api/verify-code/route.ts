import dbConnection from "@/lib/dbConnection";
import UserModel from "@/models/User";
import { usernameValidation } from "@/schemas/signUpSchema";

export async function POST(request:Request){
    await dbConnection()
    try {
        const {username, code} =await request.json()
        const decodedUser = decodeURIComponent(username)
        const user = await UserModel.findOne({usename:decodedUser})
        if (!user) {
        return Response.json({
            success:false,
            meassage:'User Not Found'
        },{status:500})
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyExpiryCode)> new Date()
        if (isCodeValid && isCodeNotExpired) {
            user.isVerified =true
            await user.save()
        return Response.json({
            success:true,
            meassage:'Account Verified Successfully'
        },{
            status:200
        })
        }else if (!isCodeNotExpired){
        return Response.json({
            success:false,
            meassage:'Verification code has expired ,Please Signup again to get Code'
        },{
            status:500
        })
        }else{
        return Response.json({
            success:false,
            meassage:'Incorrect Verificaation code '
        },{
            status:500
        })
        }
    } catch (error) {
        console.error("Error verifying User",error)

        return Response.json({
            success:false,
            meassage:'Error verifying User'
        },{
            status:500
        })
    }
}



