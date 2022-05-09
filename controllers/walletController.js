import joi from "joi";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { stripHtml } from "string-strip-html";

import db from '../db.js';

export async function getUser(req, res) {
    try {
        const { user } = res.locals;
        const wallet = await db.collection('wallet').find({ id: user._id }).toArray()
        let value = 0;
        wallet.forEach(element => {
            value += parseFloat(element.value);
        });
        res.send({value, ledger: wallet});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function postLedger(req, res) {
    /*
    const messageSchema = joi.object({

    })
    */


    try {
        const { user } = res.locals;
        const body = req.body;
        //console.log({body});
        await db.collection("wallet").insertOne({...body, date: dayjs().format('DD/MM'), id: user._id  })
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}