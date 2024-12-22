import { configDotenv } from "dotenv";
import mongoose, { Types } from "mongoose";
import{Schema} from "mongoose";
import dotenv from "dotenv";
import { date } from "zod";
dotenv.config();

const connectToDataBase = async() => {

  const MONGOURL: any = process.env.MONGO_URL

  try{
    await mongoose.connect(MONGOURL, {
    });
    console.log("Connect Established");
  } catch (error) {
    console.error('Error connecting to database', error);
  }
};

connectToDataBase();

const UserSchema = new Schema ({
    email: {type: String, unique: true},
    password: String,
    name: {type: String, unique: true}
});

const User = mongoose.model('User', UserSchema);


const tagSchema = new Schema ({
    title: {type: String, required: true, unique: true},
    contentId: {type: Types.ObjectId},
    userId: {type: Types.ObjectId, ref: User}
})

const Tag = mongoose.model('Tag', tagSchema);


const contentTypes = ['youtube', 'text', 'tweet', 'tag'];
const ContentSchema = new Schema ({
    content: String,
    title: String,
    type: {type: String, enum: contentTypes, required: true},
    tag: [{type: String, ref: Tag}],
    userId: {type: Types.ObjectId, ref: User},
    date: {type: Date, default: Date.now}
});

const Content = mongoose.model('Content', ContentSchema);


const linkSchema = new Schema ({
    hash: {type: String, required: true},
    userId: {type: Types.ObjectId, required: true, ref: User, unique: true}
})

const Link = mongoose.model('Link', linkSchema);

export{
    User,
    Content,
    Tag,
    Link
}
