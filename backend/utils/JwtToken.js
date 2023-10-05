// create a token and saving it in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  // options for cookies

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
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
