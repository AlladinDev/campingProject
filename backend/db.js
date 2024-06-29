const mongoose = require('mongoose');
const userdb = require('./model/usermodel'); // Adjust the path to your user model
const guidedb = require('./model/guidemodel'); // Adjust the path to your guide model

async function watchTripDeletions() {
    const uri = process.env.atlasConnectionString;
    await mongoose.connect(uri);
   console.log('database connected')
    const tripCollection = mongoose.connection.collection('tripdatabases'); // Adjust collection name if necessary
    const changeStream = tripCollection.watch();
    changeStream.on('change', async (change) => {
        if (change.operationType === 'delete') {
            const tripId = change.documentKey._id;
            await handleTripDeletion(tripId);
        }
    });

    console.log('Watching for changes in tripdatabase collection...');
}

async function handleTripDeletion(tripId) {
    try {
        // Remove tripId from users collection
        await userdb.updateMany(
            { trips: tripId },
            { $pull: { trips: tripId } }
        );

        // Remove tripId from guides collection
        await guidedb.updateMany(
            { trips: tripId },
            { $pull: { trips: tripId } }
        );

        console.log(`Removed trip ID ${tripId} from users and guides collections`);
    } catch (err) {
        console.error('Error handling trip deletion:', err);
    }
}

watchTripDeletions().catch(console.error);

    