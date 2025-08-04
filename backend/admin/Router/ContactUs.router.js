import express from "express"
import { createContact, deleteContact, getContact, getContacts, updateContact } from "../controllers/Contactus.controllers.js";

const router = express.Router();

router.post('/create',createContact);
router.get('/all',getContacts);
router.get("/one/:id",getContact);
router.put('/update/:id',updateContact);
router.delete('/delete/:id',deleteContact);

export default router;