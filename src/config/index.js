const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

const config = {
  port: process.env.PORT,
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: process.env.RINKEBY_ACCOUNTS,
    },
    local: {
      url: "http://127.0.0.1:8545/",
      accounts: "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
    },
  },
}

module.exports = config;