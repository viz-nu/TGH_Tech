import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        tasks:
            [{
                taskname: {
                    type: String,
                    required: true
                },
                isCompleted: {
                    type: Boolean,
                    default: false
                },
                priority: {
                    type: Number,
                    default: 1
                },
                isCancelled: {
                    type: Boolean,
                    default: false
                },
            }]
    },
    { timestamps: true }
);

const userModel = mongoose.model("TGH", userSchema, "users");

export default userModel