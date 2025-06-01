
import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('681779ab00292f7b26f2');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;
