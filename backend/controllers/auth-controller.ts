const authDb = require('../db/auth');

const registerAccount = (req: any, res: any) => {
  console.log(req.body);
  // If validation pass , authDb.createAccount(req.body)
  // If createAccount passses status 200 else status 400
  res.status(200).json({
    status: 'Success',
    data: 'alive',
  });
};

const loginAccount = (req: any, res: any) => {
  res.status(200).json({
    status: 'Logged in',
  });
};

module.exports = { registerAccount, loginAccount };
