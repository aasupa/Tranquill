import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile:  {
      type: Number,
      
    },
    impressions: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

UserSchema.pre('remove', async function (next) {
  const userId = this._id;
  
  // Remove user from friends list of other users
  await mongoose.model('User').updateMany(
    { friends: userId },
    { $pull: { friends: userId } }
  );
  next();
});
const User = mongoose.model("User", UserSchema);
export default User;
