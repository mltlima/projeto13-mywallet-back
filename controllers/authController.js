import joi from 'joi';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { stripHtml } from 'string-strip-html';

import db from '../db.js';


export async function signUp(req, res) {
    const userSchema = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
        email: joi.string().email().required()
    });
    const { error } = userSchema.validate(req.body);
    if (error) {return res.sendStatus(422);}

    const { username, password } = req.body;
    //check if user exists in database
    const checkUser = await db.collection("users").findOne({ username });
    if (checkUser) {return res.sendStatus(409);}

    const userInfo = req.body;
    delete userInfo.password;
    //console.log({userInfo})//delete
    try {
        await db.collection("users").insertOne({...userInfo, password: bcrypt.hashSync(password, 10)});
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function login(req, res) {
    const userSchema = joi.object({
        password: joi.string().required(),
        email: joi.string().email().required()
    });
    const { error } = userSchema.validate(req.body);
    
    if (error) { return res.sendStatus(422);}

    const { email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email });
        if(!user) {return res.sendStatus(404);} //user not found

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await db.collection("sessions").insertOne({token, userId: user._id});
            res.send(token);
        } else { res.sendStatus(404);}
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}