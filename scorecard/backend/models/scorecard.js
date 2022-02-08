import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ScoreCardSchema = Schema({
    name:    { type: String },
    subject: { type: String },
    score:   { type: Number }
});

const exportSchema = mongoose.model('scorecard', ScoreCardSchema);

export default exportSchema;