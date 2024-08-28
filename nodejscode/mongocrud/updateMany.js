// Import mongo client //
const { MongoClient } = require('mongodb')

// Import Database connection URI
const uri = require('./atlas_uri.js');

const client = new MongoClient(uri);

const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

const documentToUpdate = {account_type: 'checking'}
const update = {$push: {transfers_complete: 'TR41330800'}}

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
   let result = await accountsCollection.updateMany(documentToUpdate, update)
   result.modifiedCount > 0
    ?console.log(`updated ${result.modifiedCount} document`)
    :console.log("No documents updated")   
 } catch (err) {
   console.error(`Error updating document: ${err}`)
 } finally {
   await client.close()
 }
}
 
main()