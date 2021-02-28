const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
// isActive: 0: not Active, 1 : active, -1: block
mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    isActive: {
        type: Number,
        default: 0,
    },
    avatarLink: String,
    Gender: Number,
}, {collection: "Users"},{ toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.virtual("userInThread",{
    ref: "UserInThreadDetail",
    localField: "userID",
    foreignField: "userID",
    justOne: false
});

userSchema.plugin(AutoIncrement, { inc_field: "userID" });
mongoose.model("User", userSchema);

const threadSchema = mongoose.Schema({
    threadName: String,
}, {collection: "Threads"}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

threadSchema.virtual("admin",{
    ref: "User",
    localField: "admin",
    foreignField: "userID",
    justOne: true,
});

threadSchema.virtual("users",{
    ref: "User",
    localField: "users",
    foreignField: "userID",
    justOne: false,
});

threadSchema.plugin(AutoIncrement, {inc_field: "threadID"});
mongoose.model("Thread", threadSchema);

const userInThreadDetailSchema = mongoose.Schema({
    userID: {
        type: Number, 
        default: 0,
    },
    ThreadID: {
        type: Number,
        default: 0
    },
    joinDate: {
        type: Date,
        default: Date.now(),
    }
}, {collection: "UserInThreadDetails"},{ toJSON: { virtuals: true }, toObject: { virtuals: true } });

userInThreadDetailSchema.virtual("user", {
    ref: "User",
    localField: "userID",
    foreignField: "userID",
    justOne: false
});

userInThreadDetailSchema.virtual("thread", {
    ref: "Thread",
    localField: "threadID",
    foreignField: "threadID",
    justOne: false
})

mongoose.model("UserInThreadDetail", userInThreadDetailSchema);

const messageSchema = mongoose.Schema({
    createTime:{
        type: Date,
        default: Date.now(),
    },
    content: String,
});

messageSchema.virtual("sender", {
    ref: "User",
    localField: "sender",
    foreignField: "userID",
    justOne: false,
},{collection: "Messages"},{ toJSON: { virtuals: true }, toObject: { virtuals: true } });

mongoose.model("Message", messageSchema);