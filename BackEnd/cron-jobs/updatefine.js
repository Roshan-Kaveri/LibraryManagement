// cronJobs.js
const cron = require('node-cron');
const RentRequest = require('../models/requests');
const Fine = require('../models/fine');

const startCronJob = () => {
  cron.schedule('*/1 * * * *', async () => { // Runs every 5 minutes
    const now = new Date();
    try {
      const expiredRequests = await RentRequest.find({
        status: 'Waiting to be Collected',
        reservedUntil: { $lt: now },
      });

      if (expiredRequests.length > 0) {
        console.log(`${expiredRequests.length} expired reservation(s) found. Applying fines...`);
      } else {
        console.log("No expired reservations found.");
      }

      for (const request of expiredRequests) {
        const existingFine = await Fine.findOne({ requestId: request._id });
        if (existingFine) {
          console.log(`Fine already applied for request ID: ${request._id}`);
          continue;
        }

        const fineAmount = 100;

        const fine = new Fine({
          userId: request.userId,
          bookId: request.bookId,
          requestId: request._id,
          amount: fineAmount,
          startTime: now,
        });

        await fine.save();
        request.status = 'Late';
        await request.save();

        console.log(`Fine applied for request ID: ${request._id}, User ID: ${request.userId}, Fine Amount: ${fineAmount}`);
      }
    } catch (err) {
      console.error('Failed to process fines:', err);
    }
  });
};

module.exports = startCronJob;
