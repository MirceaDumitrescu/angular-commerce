const validation =  (schema) => {
  const joiValidation = (req: Request, res: Result, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    if(error) {
      return res.status(422).json({
        status: 'Unprocessable entity',
        message: 'Invalid data provided'
      })
    }
    else {
      next();
    }
  }
  return joiValidation;
}

module.exports = validation;