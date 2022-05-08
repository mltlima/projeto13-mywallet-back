import db from "./../db.js";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {return res.status(401);}

        const user = await db.collection("users").findOne({ _id: session.userId });
        if (!user) {return res.status(401);}

        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function validateLogin(req, res, next) {

}

export async function validateSignUp(req, res, next) {
    
}