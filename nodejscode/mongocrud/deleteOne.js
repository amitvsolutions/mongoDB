// Import mongo client //
const { MongoClient } = require('mongodb')

// Import Database connection URI
const uri = require('./atlas_uri.js');

const client = new MongoClient(uri);

const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

const documentToDelete = {account_id:'MDB829001377'}

const connectToDatabase = async () => {
    try{
        await client.connect();
        console.log(`connected to the ${dbname} database`)
    }catch(err){
        console.error(`Error coonnecting to the database: ${err}`)
    };
};

const main = async () => {
 try {
   await connectToDatabase()
   // insertOne method is used here to insert the sampleAccount document
   let result = await accountsCollection.deleteOne(documentToDelete)
   result.deletedCount == 1
    ?console.log("deleted one document")
    :console.log("No documents deleted")
 } catch (err) {
   console.error(`Error deleting document: ${err}`)
 } finally {
   await client.close()
 }
}
 
main()