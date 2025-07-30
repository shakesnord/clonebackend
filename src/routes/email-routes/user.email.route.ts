import { Router } from "express";
import { emailControllers } from "../../controllers/email-controllers/user.email.controller";
const router = Router();

router.post("/credential", emailControllers.addEmailCredential);

export { router as UserEmailRouter };
//send email
