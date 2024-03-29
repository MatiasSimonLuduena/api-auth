// imports
import express from "express"
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from "cors";

// import routes
import users from "./routes/usersRoutes.js"
import coments from "./routes/comentsRoutes.js"

// methods
const app = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB working correctly');
})
.catch((error) => {
    console.error('Error al conectar con MongoDB:', error);
});

// routes
app.use("/api/users", users);
app.use("/api/coments", coments);

// init server
const port = process.env.PORT;
app.listen(port, () => console.log(`The server is start in port ${port}`));