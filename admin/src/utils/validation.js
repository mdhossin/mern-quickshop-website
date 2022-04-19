export const validRegister = (user) => {
  const { name, email, password, cf_password } = user;

  const errors = [];

  if (!name.trim()) {
    errors.push("Please add your name.");
  } else if (name.length > 20) {
    errors.push("Your name is up to 20 charactor long.");
  }

  if (!email.trim()) {
    errors.push("Please add your email.");
  } else if (!validateEmail(email)) {
    errors.push("Email format is incorrect.");
  }

  const message = checkPassword(password, cf_password);
  if (message) errors.push(message);

  return {
    errMsg: errors,
    errLength: errors.length,
  };
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const checkPassword = (password, cf_password) => {
  if (password.length < 6) {
    return "Password must be at least 6 chars.";
  } else if (password !== cf_password) {
    return "Confirm password did not match.";
  }
};

export const isEmpty = (value) => {
  if (!value) return true;
  return false;
};

export const isEmail = (email) => {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isLength = (password) => {
  if (password.length < 6) return true;
  return false;
};

export const isMatch = (password, cf_password) => {
  if (password === cf_password) return true;
  return false;
};
