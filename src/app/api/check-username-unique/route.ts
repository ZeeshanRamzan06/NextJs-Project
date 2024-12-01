import dbConnection from "@/lib/dbConnection";
import UserModel from "@/models/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { console } from "inspector";
import { z } from "zod";

const usernameQuerySchema = z.object({
    username :usernameValidation
})

export async function GET(request:Request){
        if (request.method !== 'GET') {
            return Response.json({
                success: false,
                message:'Method not allowed'
            },{status:400})
        }
    await dbConnection()

    try {
        const {searchParams} =new URL(request.url)
        const queryParams ={
            username:searchParams.get('username')
        }

        //validation with zod

        const result =usernameQuerySchema.safeParse(queryParams)

        if (!result.success) {
            const usernameError =result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameError?.length > 0 ? usernameError.join(', '):'Invalid Query Parameter'
            },{status:400})
        }
        const {username} =result.data
        const existingVerifiedUser =await UserModel.findOne({username,isVerified:true})
        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message:'Username is already taken'
            },{status:400})
        }
        return Response.json({
            success: true,
            message:'Username is unique'
        },{status:200})

    } catch (error) {
        console.error("Error checking username",error)

        return Response.json({
            success:false,
            message:'Error checking Username'
        },{
            status:500
        })
    }


}