import Joi from "joi";
import { db } from "../db/mongodb.js";
import dotenv from "dotenv";
import dayjs from "dayjs";
dotenv.config();

export async function registerPoll(req, res) {
  const registerSchema = Joi.object({
    title: Joi.string().min(1).required(),
    expireAt: Joi.date().min("now"),
  });

  try {
    const poll = req.body;
    const { error } = registerSchema.validate(poll);

    if (error) {
      return res.status(422).send(`Invalid format: ${error.details[0].message}`);
    }

    const pollExists = await db.collection("polls").findOne({ title: poll.title });

    if (pollExists) {
      return res.status(409).send("Poll already exists");
    }

    let expireAt = poll.expireAt;

    if (!expireAt || expireAt === "") {
  
      expireAt = dayjs().add(30, "day").format("YYYY-MM-DD HH:mm");
    }

    await db.collection("polls").insertOne({
      title: poll.title,
      expireAt: expireAt,
    });

    return res.status(201).send("Data added successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}
