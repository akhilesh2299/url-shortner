import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
  }, {
  timestamps: true
}
);

export default mongoose.model('Url', urlSchema);
