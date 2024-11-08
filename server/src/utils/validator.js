import validator from "validator";

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
      minLength: 8,
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

const validateProduct = (req) => {
  const { name, price, rating, gender, sizes } = req.body;

  if (!name.trim()) {
    throw new Error("Product name is required and cannot be empty.");
  }

  if (price === undefined || price === null || isNaN(price) || price <= 0) {
    throw new Error(
      "Price is required and must be a valid number greater than or equal to zero."
    );
  }

  if (
    rating === undefined ||
    rating === null ||
    isNaN(rating) ||
    rating <= 0 ||
    rating > 5
  ) {
    throw new Error("Rating is required and must be between 0 - 5.");
  }

  const validGenders = ["male", "female", "kids", "unisex"];
  if (!validGenders.includes(gender)) {
    throw new Error(
      `Gender must be one of the following: ${validGenders.join(", ")}.`
    );
  }

  const validSizes = ["XS", "S", "M", "L", "XL"];
  if (!Array.isArray(sizes) || sizes.some((s) => !validSizes.includes(s))) {
    throw new Error(`Size must be of valid sizes: ${validSizes.join(", ")}.`);
  }
};

export { validateRegisterUser, validateLoginUser, validateProduct };
