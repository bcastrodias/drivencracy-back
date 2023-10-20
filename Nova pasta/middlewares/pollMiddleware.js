import joi from 'joi';

function PostPollMiddleware(req, res, next) {
  const pollSchema = joi.object().keys({
    title: joi.string().min(1).required(),});
  
  const validationpoll = pollSchema.validate(req.body);
    if (validationpoll.error) {
      res.status(422).send(validationpoll.error.details[0].message);
      return;

    } next();
  }

export { PostPollMiddleware };
