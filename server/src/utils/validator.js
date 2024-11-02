import validator from "validator";

const MIN_PASSWORD_LENGTH = 8;

const validateRegisterUser = (req) => {
  const { fullName, email, password } = req.body;

  if (!fullName?.trim()) {
    throw new Error("Full name is required and cannot be empty.");
  }

  if (!email?.trim() || !validator.isEmail(email)) {
    throw new Error("Please provide a valid email address.");
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
  const { email } = req.body;

  if (!email?.trim()) {
    throw new Error("Please provide a valid email address.");
  }
};

export { validateRegisterUser, validateLoginUser };
