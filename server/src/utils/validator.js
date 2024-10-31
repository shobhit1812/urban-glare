import validator from "validator";

const MIN_USERNAME_LENGTH = 4;
const MAX_USERNAME_LENGTH = 24;
const MIN_PASSWORD_LENGTH = 8;

const validateRegisterUser = (req) => {
  const { fullName, email, username, password } = req.body;

  // fullName.trim() === ""
  if (!fullName?.trim()) {
    throw new Error("Full name is required and cannot be empty.");
  }

  if (!email?.trim() || !validator.isEmail(email)) {
    throw new Error("Please provide a valid email address.");
  }

  if (!username?.trim() || !validator.isAlphanumeric(username)) {
    throw new Error(
      `Username must be alphanumeric and between ${MIN_USERNAME_LENGTH} to ${MAX_USERNAME_LENGTH} characters.`
    );
  } else if (
    username.length < MIN_USERNAME_LENGTH ||
    username.length > MAX_USERNAME_LENGTH
  ) {
    throw new Error(
      `Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters.`
    );
  }

  if (
    !password?.trim() ||
    !validator.isStrongPassword(password, {
      minLength: MIN_PASSWORD_LENGTH,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error(
      "Password must be at least 8 characters long, with 1 uppercase, 1 lowercase, 1 number, and 1 special character."
    );
  }
};

const validateLoginUser = (req) => {
  const { email, username } = req.body;

  if (!email?.trim() || !validator.isEmail(email)) {
    throw new Error("Please provide a valid email address.");
  }

  if (!username?.trim() || !validator.isAlphanumeric(username)) {
    throw new Error(
      `Username must be alphanumeric and between ${MIN_USERNAME_LENGTH} to ${MAX_USERNAME_LENGTH} characters.`
    );
  } else if (
    username.length < MIN_USERNAME_LENGTH ||
    username.length > MAX_USERNAME_LENGTH
  ) {
    throw new Error(
      `Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters.`
    );
  }
};

export { validateRegisterUser, validateLoginUser };
