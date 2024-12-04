import dbConnection from "@/lib/dbConnection";
import { authOption } from "../../auth/[...nextauth]/option";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import {User} from 'next-auth'

export async function DELETE(request:Request, {params} :{params:{messageid:string}}){
    const messageid =params.messageid 
    await dbConnection()

    const session =await getServerSession(authOption)
    const user:User = session?.user
    if (!session || !session.user) {
        return Response.json({
            success:false,
            message:'User is not Authenticated'
        },{
            status:401
        })
    }

   try {
    const updatedResult = await UserModel.updateOne(
        {_id: user._id},
        {$pull: {messages: {_id:messageid}}}
    )
    if (updatedResult.modifiedCount == 0) {
        return Response.json({
            success:false,
            message:'Message not found or already deleted'
        },{
            status:404
        })
    
    }
    return Response.json({
        success:true,
        message:'Message Deleted Successfully'
    },{
        status:200
    })

   } catch (error) {
    console.log("Error in deleting message route",error)
    return Response.json({
        success:false,
        message:'Error deleting Message'
    },{
        status:401
    })

   }

}