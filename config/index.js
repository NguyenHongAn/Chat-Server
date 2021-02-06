const Normalize = require("../utils/normalize");

const PORT = Normalize.nomalizePort(process.env.PORT || 8000);

module.exports ={
    PORT: PORT
};