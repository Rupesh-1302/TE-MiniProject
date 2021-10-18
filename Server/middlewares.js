module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      error: true,
      message: "Please log in first",
      statusCode: 401,
      redirect: "/login",
    });
  }
  next();
};
