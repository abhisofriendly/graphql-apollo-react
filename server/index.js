const express = require('express')
const app = express()
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const graphql = require('graphql')
const { GraphQLSchema } = graphql
const { graphqlHTTP } = require('express-graphql')
const UserType =  require('./schema/typeDefs/userType')
const { RootQuery, Mutation} = require('./schema/query/index')
const cors =  require('cors')

const fetchData =async()=>{
    let result = await axios.get('https://jsonplaceholder.typicode.com/users')
    fs.writeFileSync(path.join(__dirname, 'mydata.js'), JSON.stringify(result.data), {
        encoding: 'utf-8',
        mode: 666,
        flag: 'a+'
    })
}
// fetchData()

const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation })

app.use(cors())

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

app.get('/',(req,res)=>{
    res.json("server is running")
})

const port = 8000
app.listen(port, ()=>{
    console.log(`server is listening on port 8000`)
})