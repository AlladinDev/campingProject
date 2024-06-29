const mongoose = require('mongoose');
const db = mongoose.connection;
async function checkMobileExistence(mobileNumber, email) {
    try {
        const query = [
            { $match: { $or: [{ email: email }, { mobile: mobileNumber }] } },
            { $limit: 1 }
        ]
        // Execute all pipelines concurrently using Promise.all
        const results = await Promise.all([
            db.collection('guidedatabases').aggregate(query).toArray(),
            db.collection('userdatabases').aggregate(query).toArray(),
            db.collection('admindatabases').aggregate(query).toArray()
        ]);
        console.log('aggregation result is',results)
        const mobileExists = results.some(result => result.length > 0);//some method returns true or false
        console.log('mobileExists :',mobileExists)
        if (mobileExists)
            return true
        else
            return false
    } catch (error) {
        console.error('Error checking mobile number:', error);
        return false;
    }
}
module.exports = checkMobileExistence
