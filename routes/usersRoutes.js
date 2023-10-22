import express from 'express';
const routes = express.Router();

import {
    getAll, createUser, deleteUser, updateUser
} from "../controllers/usersControllers.js";

routes.get("/all", getAll);

routes.post("/create", createUser);

routes.put("/update/:id", updateUser);

routes.delete("/delete/:id", deleteUser);

export default routes;