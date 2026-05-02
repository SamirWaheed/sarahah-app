import mongoose from "mongoose";

import { User_Role, Gender,Status,Provider_Type,Channels} from "../../utils/utils.index.js";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        minLength:[3,"First Name Must be at lest 3 letters"],
        maxLength:[50,"First Name Must be at Most 50 letters"]
    },
    lastName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        minLength:[3,"last Name Must be at lest 3 letters"],
        maxLength:[50,"Last Name Must be at lest 50 letters"]
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        index:{
            name:"email_index",
            unique:true
        },
        validate:{
            validator: function(value){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            },
            message: "Invalid email format"

        }
    },
    password:{
        type:String,
        required:true,
        // validate:{
        //     validator: function(value){
        //     return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value)
             
        
        // },
        //     message: "Password not matched with Expression"
        // },
        select:false
    },
    phone:{
        type:String,
       
    },
    gender:{
        
        type:String,
        enum:Object.values(Gender),
    
    },
    role:{
        type:String,
        enum:Object.values(User_Role),
        default: User_Role.User
    },
    status:{
        type:String,
        enum:Object.values(Status)
    },
    googleId:{
        type:String,

        index:{
            unique: true,
            name:"googleId_index"
        }
    },
    provider:{
        type: String,
        enum: Object.values(Provider_Type),
        default: Provider_Type.Local
    },
    isEmailVerified:{
        type: Boolean,
        default: false
    },
    OTPs:[{
        value:{
            type:String,
            required:true
        },
        expireAt:{
            type: Date,
            default: Date.now() +( 5*60*1000)
        },
        channel:{
            type: String,
            enum:Object.values(Channels),
            default : Channels.Email
        },
        createdAt:{
            type: Date,
            default: Date.now()
        }
    }],
    isDeleted:{
        type: Boolean,
        default:false
    },
    deletedAt:{
        type:Date
    }
},
{
    timestamps:true,
    toJSON:{getters:true,
            virtuals:true
    },
    toObject:{
        getters: true,
        virtuals: true
    }
}
)                                                                                                                         
userSchema.virtual("fullName").get(function(){
    return this.firstName + " " + this.lastName
})

userSchema.virtual("Messages",{
    ref:"Message",
    localField: "_id",
    foreignField:"receiver"
})
userSchema.pre('/^find/',function(next){
    this.where({isDeleted:false});
    next()
})

const User = mongoose.model("User",userSchema);


export default User