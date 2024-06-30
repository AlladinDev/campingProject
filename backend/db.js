const mongoose = require('mongoose');
const userdb = require('./model/usermodel'); // Adjust the path to your user model
const guidedb = require('./model/guidemodel'); // Adjust the path to your guide model

async function watchTripDeletions() {
    try {
        const uri = process.env.atlasConnectionString;
        await mongoose.connect(uri);
        console.log('Database connected');

        const tripCollection = mongoose.connection.collection('tripdatabases'); // Adjust collection name if necessary
        const changeStream = tripCollection.watch();

        changeStream.on('change', async (change) => {
            if (change.operationType === 'delete') {
                const tripId = change.documentKey._id;
                await handleTripDeletion(tripId);
            }
        });

        console.log('Watching for changes in tripdatabase collection...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

async function handleTripDeletion(tripId) {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        // Remove tripId from users collection
        await userdb.updateMany(
            { trips: tripId },
            { $pull: { trips: tripId } },
            { session }
        );

        // Remove tripId from guides collection
        await guidedb.updateMany(
            { trips: tripId },
            { $pull: { trips: tripId } },
            { session }
        );

        await session.commitTransaction();
        console.log(`Removed trip ID ${tripId} from users and guides collections`);
    } catch (err) {
        await session.abortTransaction();
        console.error('Error handling trip deletion:', err);
    } finally {
        session.endSession();
    }
}

watchTripDeletions().catch(console.error);
