const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');


// Temporary hard-coded data
const customers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    age: 23
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@gmail.com',
    age: 22
  }
]
// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});
// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        for(let i = 0; i < customers.length; i++) {
          if(customers[i].id == args.id) {
            return customers[i];
          }
        }
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery
});
