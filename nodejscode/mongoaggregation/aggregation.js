// Import mongo client //
const { MongoClient } = require('mongodb')

//require("dotenv").config()
//const uri = process.env.MONGODB_URI

const uri = require('./atlas_uri.js');
const client = new MongoClient(uri)
const dbname = "bank";
const collection_name = "accounts";
const accountsCollection = client.db(dbname).collection(collection_name);

const pipeline = [
  // Stage 1: $match - filter the documents (checking, balance >= 1500)
  { $match: { account_type: "checking", balance: { $gte: 1500 } } },

  // Stage 2: $sort - sorts the documents in descending order (balance)
  { $sort: { balance: -1 } },

  // Stage 3: $project - project only the requested fields and one computed field (account_type, account_id, balance, gbp_balance)
  {
    $project: {
      _id: 0,
      account_id: 1,
      account_type: 1,
      balance: 1,
      // GBP stands for Great British Pound
      gbp_balance: { $divide: ["$balance", 1.3] },
    },
  },
]
  const main = async () => {
    try {
      await client.connect()
      console.log(`Connected to the database 🌍\n ${uri}`)
      let result = await accountsCollection.aggregate(pipeline)
      for await (const doc of result) {
        console.log(doc)
      }
    } catch (err) {
      console.error(`Error connecting to the database: ${err}`)
    } finally {
      await client.close()
    }
  }
  
  main()