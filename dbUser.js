import {MongoClient,ObjectId} from 'mongodb';

async function runGetStarted() {
    const dbServer = new MongoClient('mongodb://localhost:27017');
    try {
        const db = dbServer.db('e-commerce');
        const user = db.collection('user');

         const insertOneData = await user.insertOne({
            nama: 'Bagus',
            alamat: 'Magetan',
            nomorTelepon: '0987349'
        });

        // await user.insertMany([{
        //  nama: 'Doni',
        //  alamat:'Madiun',
        //  nomorTelepon:'8765443',   
        // },
        // {
        //  nama: 'Rocky',
        //  alamat: 'Magetan',
        //  nomorTelepon: '4567890',
        // }]);
        // console.log(insertOneData);
        // const findOneUser = await user.findOne({nama:'Bagus'});
        // const updateOneData = await user.updateOne(
        // {alamat: 'Magetan'},
        // {$set: {nama: "Bagusadi", email: "adi@example.com",alamat: "Malang"}},
        // {upsert: true},

        // const deleteManyUser = await user.deleteMany({alamat: 'Malang'});
        // console.log(deleteManyUser);
    


    } catch (error) {
        
    }finally{
        await dbServer.close();
    }
} 
runGetStarted().catch(console.dir);


