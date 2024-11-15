import User from "../models/user.model.js";

const toggleFavorite = async (req, res) => {
  try {
    const { _id, isAdmin } = req.user;
    const { productId } = req.body;

    if (isAdmin) {
      return res.status(403).send("Admins cannot favorite products.");
    }

    const user = await User.findById(_id);
    const favoriteIndex = user.favorites.indexOf(productId);

    if (favoriteIndex === -1) {
      user.favorites.push(productId);
    } else {
      user.favorites.splice(favoriteIndex, 1);
    }

    await user.save();
    // console.log(user.favorites);
    return res
      .status(200)
      .json({ message: "Favorites updated.", favorites: user.favorites });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating favorites", error: error.message });
  }
};

const getUserFavorites = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id).populate("favorites");
    if (!user) {
      return res.status(404).send("User not found.");
    }

    return res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving favorites", error: error.message });
  }
};

export { toggleFavorite, getUserFavorites };
