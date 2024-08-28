// Import mongo client //
const { MongoClient } = require('mongodb')

// Import Database connection URI
const uri = require('./atlas_uri.js');

const client = new MongoClient(uri);

const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

const sampleAccount = {
 account_holder: "Linus Torvalds",
 account_id: "MDB829001337",
 account_type: "checking",
 balance: 50352434,
}

const connectToDatabase = async () => {
    try{
        await client.connect();
        console.log(`connected to the ${dbname} database`)
    }catch(err){
        console.error(`Error coonnecting to the database: ${err}`)
    };
};

const documentsToFind = {account_id:'MDB829000001'}

const main = async () => {
 try {
   await connectToDatabase()
   let result = await accountsCollection.findOne(documentsToFind)
   console.log(`Found one document`)
   console.log(result)
 } catch (err) {
   console.error(`Error finding documents: ${err}`)
 } finally {
   await client.close()
 }
}
 
main()