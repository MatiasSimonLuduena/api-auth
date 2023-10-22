import Coments from "../models/comentsModels.js"

// get
export const getOneUser = async (req, res) => {
    try {
        const { user, product } = req.params
        const comments = await Coments.find({ user, product });

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// post
export const createComent = async (req, res) => {
    try {
        // verificar user y product desde frontend
        const { user, coment, product } = req.body;

        if (coment.length < 15) {
            return res.status(400).json({ error: 'El comentario debe tener un mínimo de 15 caracteres' });
        }
        
        const newComent = new Coments({ user, coment, product });

        const createdComent = await newComent.save();

        res.status(201).json(createdComent);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// delete
export const deleteComent = async (req, res) => {
    try {
        const comentId = req.params.id;

        const deletedComent = await Coments.findByIdAndRemove(comentId);

        if (!deletedComent) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        res.status(200).json({ message: 'Comentario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// put
export const updateComent = async (req, res) => {
    try {
        const comentId = req.params.id;
        const updatedData = req.body;

        const errors = []

        if (updatedData.user || updatedData.product) {
            errors.push("El user y el product no se pueden actualizar");
        }
        if (updatedData.coment.length < 15) {
            errors.push("El comentario debe tener un mínimo de 15 caracteres");
        }

        if (errors.length) {
            return res.status(400).json({ error: errors });
        }

        const updatedComent = await Coments.findByIdAndUpdate(comentId, updatedData, { new: true });

        if (!updatedComent) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        res.status(200).json(updatedComent);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}