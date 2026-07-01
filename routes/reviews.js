const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/Listing");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

//Review Route
//Post Review Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    // console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    // console.log("Review saved");
    req.flash("success", "New Review Created Succesfully!");
    res.redirect(`/listings/${listing.id}`);
  }),
);

// Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted Succesfully!");
    res.redirect(`/listings/${id}`);
  }),
);

module.exports = router;
