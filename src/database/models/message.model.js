
import mongoose, {Schema} from 'mongoose';

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength:[3,"Content Must be at lest 3 letters"],
        maxLength:[50,"Content Must be at Most 50 letters"]
    },
    receiver: [{
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    
    }],
    
    sender: [{
        type: Schema.Types.ObjectId,
        ref:"User",
        default:null
    
    }],
     isDeleted:{
        type: Boolean,
        default:false
    },
    deletedAt:{
        type:Date
    }
},{
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true
    },
    toObject: {
        virtuals: true,
        getters: true
    }
});

messageSchema.pre('/^find/',function(next){
    this.where({isDeleted:false});
    next()
})

const Message = mongoose.model('Message', messageSchema);
export default Message;