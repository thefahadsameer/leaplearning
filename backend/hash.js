const bcrypt = require("bcrypt");

(async () => {
  const hash = await bcrypt.hash("Test@1234", 10);
  console.log(hash);
})();