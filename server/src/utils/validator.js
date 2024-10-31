import validator from "validator";

const validateRegisterUser = (req) => {
  const { fullName, email, username, password } = req.body;

  if (!fullName || fullName.trim() === "") {
    throw new Error("Full name is required and cannot be empty.");
  }

  if (!validator.isEmail(email) || email.trim() === "") {
    throw new Error("Please provide a valid email address.");
  }

  if (
    !validator.isAlphanumeric(username) ||
    username.length < 4 ||
    username.length > 24 ||
    username.trim() === ""
  ) {
    throw new Error(
      "Username must be alphanumeric and between 3 to 20 characters."
    );
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }) ||
    password.trim() === ""
  ) {
    throw new Error(
      "Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, 1 number, and 1 special character."
    );
  }
};

const validateLoginUser = (req) => {
  const { email, username } = req.body;

  if (!validator.isEmail(email) || email.trim() === "") {
    throw new Error("Please provide a valid email address.");
  }

  if (
    !validator.isAlphanumeric(username) ||
    username.length < 4 ||
    username.length > 24 ||
    username.trim() === ""
  ) {
    throw new Error(
      "Username must be alphanumeric and between 3 to 20 characters."
    );
  }
};

export { validateRegisterUser, validateLoginUser };
