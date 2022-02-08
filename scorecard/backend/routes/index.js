import scorecardRoute from './scorecardRoute'

const wrap = fn => (...args) => fn(...args).catch(args[2])

function main(app) {
    app.post('/api/create-card', wrap(scorecardRoute.CreateCard));
    app.get('/api/query-cards', wrap(scorecardRoute.QueryCards));
    app.delete('/api/clear-db', wrap(scorecardRoute.ClearDB));
}

export default main