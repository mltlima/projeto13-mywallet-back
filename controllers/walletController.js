import joi from "joi";
import { ObjectId } from "mongodb";
import { stripHtml } from "string-strip-html";

import db from '../db.js';

export async function getUser(req, res) {
    try {
        const { user } = res.locals;
        const wallet = await db.collection("wallet").findOne({ id: user._id }).toArray();
        res.send(wallet);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function postInOUt(req, res) {
    //TODO
}