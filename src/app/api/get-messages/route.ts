import dbConnection from "@/lib/dbConnection";
import { authOption } from "../auth/[...nextauth]/option";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import {User} from 'next-auth'
import mongoose from "mongoose";

export async function POST(request:Request){
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

    const userId = new mongoose.Types.ObjectId(user._id);
    try {
        const user = await UserModel.aggregate([
            {$match:{id: userId}},
            {$unwind:'$message'},
            {$sort:{'messages.createdAt': -1}},
            {$group:{_id: '$_id', messages :{$push: '$messages'}}}

        ])
        if (!user ||user.length ===0) {
            return Response.json({
                success:false,
                message:'User not Found'
            },{
                status:401
            })
        }

        return Response.json({
            success:true,
            messages:user[0].messages
        },{
            status:401
        })
    } catch (error) {
        return Response.json({
            success:false,
            message:'Not Authenticated'
        },{
            status:404
        })
    }
}