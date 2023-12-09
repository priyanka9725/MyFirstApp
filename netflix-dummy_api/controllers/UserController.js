const User = require("../models/UserModel");
module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => (id = data.id));
      if (!movieAlreadyLiked) {
        await user.findByIdandUpdate(
          user._id,
          {
            likedMovies: [...user, likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list" });
    }
  } catch (error) {
    return res.json({ msg: "Error adding movie" });
  }
};
