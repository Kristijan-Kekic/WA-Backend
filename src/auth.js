import mongo from 'mongodb';
import connect from './db.js';
import bcrypt from 'bcrypt';

(async () => {
    let db = await connect();
    db.collection('users').createIndex({ username: 1 }, { unique: true });
   }
)();

export default {
    async registerUser(userData) {
        let db = await connect();
        
        let result;
        try {
            let doc = {
                username: userData.username,
                password: await bcrypt.hash(userData.password, 8),
                name: userData.name,
            };

            result = await db.collection('users').insertOne(doc);
        } catch (e) {
            if (e.name == 'MongoError') {
                if (e.code == 11000) {
                    throw new Error('Username already exists');
                }
            }
        }
    }
};