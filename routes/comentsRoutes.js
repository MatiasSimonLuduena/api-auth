import express from 'express';
const routes = express.Router();

import {
    getOneUser, createComent, deleteComent, updateComent
} from "../controllers/comentsControllers.js"

routes.get("/one-user/:user/:product", getOneUser);

routes.post("/create", createComent);

routes.delete("/delete/:id", deleteComent);

routes.put("/update/:id", updateComent);

export default routes;