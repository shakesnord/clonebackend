import { Router } from "express";
import {
  getAllUsers,
  addEmailCredential,
} from "../../controllers/email-controllers/users.controller";
import { emailControllers } from "../../controllers/email-controllers/user.email.controller";
const router = Router();

router.get("/users", getAllUsers);
router.post("/credentials", addEmailCredential);

export { router as UserRouter };
//send email
