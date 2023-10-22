import mongoose from "mongoose";

const comentsSchema = new mongoose.Schema({
    user: {
        type: String, required: true
    },
    coment: {
        type: String, required: true
    },
    product: {
        type: String, required: true
    }
});

const Coments = mongoose.model('coments', comentsSchema);

export default Coments;