import { GraphQLServer, PubSub } from 'graphql-yoga';

// resolvers
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import ChatBox from './resolvers/ChatBox'
// db
import db from './models';

const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
      Query,
      Mutation,
      Subscription,
      ChatBox,
    },
    context: {
      db,
      pubsub,
    },
});

export default server;