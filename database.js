import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://marcelo_junior:Gato%401234@cluster0.yd8fmpr.mongodb.net/?appName=Cluster0");

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}