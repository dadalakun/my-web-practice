import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'

async function connect () {
    dotenv.config();
    // const db = mongoose.connection;

    const dboptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    mongoose.connect(process.env.MONGO_URL, dboptions).then
        (() => { console.log('mongo db connection created') });
}

export default { connect };