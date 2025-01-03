import mongoose, {Schema ,Document} from "mongoose";


export interface Message extends Document{
    content:string,
    createdAt:Date
}

const messageSchema:Schema<Message> = new Schema ({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyExpiryCode:Date;
    isVerified:boolean;
    isAcceptedMessage:boolean;
    messages:Message[]
}

const UserSchema:Schema<User> = new Schema ({
    username:{
        type:String,
        required:[true,"username is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        match:[/.+\@.+\..+/,'Please use a valid email address']
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"Verification Code is required"],
    },
    verifyExpiryCode:{
        type:Date,
        required:[true,"Verify code Expiry is required"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptedMessage:{
        type:Boolean,
        default:true
    },
    messages:[messageSchema]
})

const UserModel =(mongoose.models.User as mongoose.Model<User> )
||(mongoose.model<User> ("User",UserSchema))

export default UserModel ;