var args   = require("yargs").argv;

var env = args.env;
if (!env) {
    env = "dev";
}

module.exports = {
    env: env
}
