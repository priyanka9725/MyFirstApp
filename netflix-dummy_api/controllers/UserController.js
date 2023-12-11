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
      res.json({ msg: "Success", movies: user.likedMovies });
    } else return res.json({ msg: "User with given mail is not found" });
  } catch (err) {
    return res.json({ msg: "Error fetching movie" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) res.status(400).send({ msg: "Movie not found" });
      likedMovies.splice(movieIndex, 1);

      await user.findByIdandUpdate(
        user._id,
        {
          likedMovies: [...user.likedMovies, data],
        },
        { new: true }
      );
    }
  } catch (error) {
    return res.json({ msg: "Error deleting movies" });
  }
};
