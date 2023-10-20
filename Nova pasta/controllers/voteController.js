import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function vote(req, res) {
    try {
        const id = req.params.id;
        const vote = {
            createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
            choiceId: id
        };

        const choice = await findChoice(vote.choiceId);

        if (!choice) {
            return res.status(404).send("Esta resposta não existe");
        }

        const poll = await findPoll(choice.pollId);

        const now = dayjs();

        if (now.diff(poll.expireAt) < 0) {
            return res.status(403).send("Esta enquete já terminou");
        }

        await voteCollection.insertOne(vote);
        return res.status(201).send("Voto registrado com sucesso");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Houve um problema no servidor");
    }
}

async function findChoice(id) {
    return await choiceCollection.findOne({ _id: ObjectId(id) });
}

async function findPoll(id) {
    return await pollCollection.findOne({ _id: ObjectId(id) });
}
