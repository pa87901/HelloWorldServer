const BookingController = require('../controllers').Bookings;
const UserController = require('../controllers').Users;
const GuideController = require('../controllers').Guides;

module.exports.updateRatings = () => {
  BookingController.getLast5MinutesOfReviews((data)=>{
    data = JSON.parse(JSON.stringify(data));
    var setOfUserIds = new Set();
    var setOfGuideIds = new Set();
    data.forEach((datum)=>{
      setOfUserIds.add(datum.user_id);
      setOfGuideIds.add(datum.guide_id);
    });
    console.log(setOfUserIds, setOfGuideIds);
    for(let userId of setOfUserIds){
      // console.log(userId);
      BookingController.getUserAverageRating(userId, (avg, count) => {
        // console.log('userid && avg', userId, avg);
        UserController.updateRating(userId, avg, count);
      });
    }
    for(let guideId of setOfGuideIds){
      BookingController.getGuideAverageRating(guideId, (avg, count)=>{
        GuideController.updateRating(guideId, avg, count);
      });
    }
  });
};

module.exports.updateRatings();