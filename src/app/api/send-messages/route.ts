import dbConnection from "@/lib/dbConnection";
import UserModel from "@/models/User";
import { Message } from "@/models/User";

export async function POST(request:Request){
    await dbConnection()
    const {username, content} =await request.json()
    try {
        const user = await UserModel.findOne({username})
        if (!user) {
            return Response.json({
                success:false,
                message:'User not Found'
            },{
                status:404
            })
        }
        if (!user?.isAcceptedMessage) {
            return Response.json({
                success:false,
                message:'User is not accepting  the messages'
            },{
                status:403
            })
        }   
        
        const newMessage = {content,createdAt:new Date()}
        user.messages.push(newMessage as Message)
        await user.save()
        
            return Response.json({
                success:true,
                message:'Message Send Successfully'
            },{
                status:200
            })
           
    } catch (error) {
        return Response.json({
            success:true,
            message:"Internal Server Error"
        },{
            status:500
        })
    }
}