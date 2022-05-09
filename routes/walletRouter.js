import { Router } from "express";

import { validateToken } from "../middleware/authMiddleware.js";
import { getUser, postLedger } from "../controllers/walletController.js";

const walletRouter = Router();

walletRouter.use(validateToken);

walletRouter.get("/wallet", getUser);
walletRouter.post("/ledger", postLedger);



export default walletRouter;