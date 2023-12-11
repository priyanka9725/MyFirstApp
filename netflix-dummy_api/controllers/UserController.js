const User = require("../models/UserModel");
module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await user.findByIdandUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list" });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie added Successfully`" });
  } catch (error) {
    return res.json({ msg: "Error adding movie" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.jspn({ msg: "Success", movies: user.likedMovies });
    } else return res.json({ msg: "User with given mail is not found" });
  } catch (err) {
    return res.json({ msg: "Error fetching movie" });
  }
};
