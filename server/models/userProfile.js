// models/UserProfile.js
import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Link to user
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
});

export default mongoose.model('UserProfile', userProfileSchema);
