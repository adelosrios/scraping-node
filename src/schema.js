import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `



`;

export default makeExecutableSchema ({
    typeDefs: this.typeDefs,
    resolvers: this.resolvers
});