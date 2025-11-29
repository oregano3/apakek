import { Schema, model } from 'mongoose';
export default model("Schema_GuildSettings", new Schema({guildID : String, muteRoleID : String}));