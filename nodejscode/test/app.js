// Import mongo client //
const { MongoClient } = require('mongodb')

// Import Database connection URI
const uri = require('./atlas_uri.js');

console.log(uri); // This should print the URI to the console

// Connect with Atlas cluster //
const client = new MongoClient(uri);
const dbname = "bank"

const connectToDatabase = async () => {
    try{
        await client.connect();
        console.log(`connected to the ${dbname} database`)
    }catch(err){
        console.error(`Error coonnecting to the database: ${err}`)
    };
};

const main = async () => {
    try{
        connectToDatabase();
    }catch(err){
        console.error('Error coonnecting to the database: ${err}')
    }finally{
        await client.close();
    }
};
main();