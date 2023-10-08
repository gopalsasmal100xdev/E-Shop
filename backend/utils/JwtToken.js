// create a token and saving it in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      data: { name: user.name, email: user.email, avatar: user.avatar },
      token,
    });
};

module.exports = sendToken;
