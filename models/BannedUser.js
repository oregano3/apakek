import { Schema, model } from 'mongoose';
export default model("Schema_BannedUser", new Schema({guildID : String, userID : String}));