import dbConnection from "@/lib/dbConnection";
import UserModel from "@/models/User";
import { usernameValidation } from "@/schemas/signUpSchema";

export async function POST(request:Request){
    await dbConnection()
    
}