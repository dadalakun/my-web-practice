import ScoreCard from '../models/scorecard'

exports.CreateCard = async (req, res) => {
    const { name, subject, score } = req.body;
    const existing = await ScoreCard.findOne({ name, subject });
    if (existing) {
        existing.score = score;
        await existing.save();
        console.log(`Updating (${name}, ${subject}, ${score})`);
        res.status(200).send({
            message: `Updating (${name}, ${subject}, ${score})`,
            card: existing
        })
    }
    else {
        const newScoreCard = new ScoreCard({ name, subject, score });
        newScoreCard.save();
        console.log(`Adding (${name}, ${subject}, ${score})`);
        res.status(200).send({
            message: `Adding (${name}, ${subject}, ${score})`,
            card: newScoreCard
        })
    }
}

exports.QueryCards = async (req, res) => {
    const { type, queryString } = req.query;
    let targets;
    if (type === 'name') {
        targets = await ScoreCard.find({ name: queryString });
    }
    else if (type === 'subject') {
        targets = await ScoreCard.find({ subject: queryString });
    } else {
        targets = await ScoreCard.find({});
    }

    if (targets.length) {
        res.status(200).send({
            messages: targets,
            message: 'Good Query'
        })
    } else {
        res.status(200).send({
            message: `${type} (${queryString}) not found!`
        })
    }

}

exports.ClearDB = async (req, res) => {
    await ScoreCard.deleteMany({});
    console.log('Datebase cleared');
    res.status(200).send({
        message: 'Database cleared'
    })
}