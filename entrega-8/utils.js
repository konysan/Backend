const bcrypt = require('bcrypt');
const SECRET = "konykony";

const creaHash = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports = { creaHash };
