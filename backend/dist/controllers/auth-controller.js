"use strict";
const registerAccount = (req, res) => {
    res.status(200).json({
        status: 'Success',
        data: 'It is alive!',
    });
};
module.exports = { registerAccount };
