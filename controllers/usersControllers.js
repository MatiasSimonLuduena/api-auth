import Users from "../models/usersModel.js";

// get
export const getAll = async (req, res) => {
    try {
        const users = await Users.find();
  
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// post
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const errors = [];

        if (name.length < 5) {
            errors.push('El campo name debe tener mas de 5 carácteres');
        }
        if (password.length < 5) {
            errors.push('El campo password debe tener mas de 5 carácteres');
        }

        const validRoles = ["customer", "user", "admin", "moderator"];
        if (!validRoles.includes(role)) {
            errors.push("El campo rol es incorrecto");
        }

        // Expresión regular para verificar direcciones de correo electrónico
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        // Verifica si el campo "email" contiene una dirección de correo electrónico válida
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ error: 'La dirección de correo electrónico no es válida' });
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        // Verificar si el correo electrónico ya está en uso
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
        }
    
        // Crea una nueva instancia del modelo User con los datos proporcionados
        const newUser = new Users({ name, email, password, role });
    
        // Guarda el nuevo usuario en la base de datos
        const savedUser = await newUser.save();
    
        res.status(201).json(savedUser); // Responde con el usuario creado
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

// delete
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Busca por su ID
        const user = await Users.findById(userId);

        // Verifica si se puede eliminar
        if (user.protected !== undefined && user.protected === true) {
            return res.status(403).json({ error: 'No se permite eliminar esta categoría' });
        }

        // Busca por su ID y lo elimina
        const deletedUser = await Users.findByIdAndRemove(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar al usuario' });
    }
}

// put
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // Busca por su ID
        const user = await Users.findById(userId);

        // Verifica si se puede modificar
        if (user.protected !== undefined && user.protected === true) {
            return res.status(403).json({ error: 'No se permite modificar esta categoría' });
        }

        // Asegura que la propiedad 'protected' no se modifique en los datos de actualización
        if (updateData.protected !== undefined) {
            return res.status(404).json({ error: 'No se puede modificar la propiedad protected' });
        }

        const errors = [];

        if (req.body.name && req.body.name.length < 5) {
            errors.push('El campo name debe tener mas de 5 carácteres');
        }
        if (req.body.password && req.body.password.length < 5) {
            errors.push('El campo password debe tener mas de 5 carácteres');
        }

        // Expresión regular para verificar direcciones de correo electrónico
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        // Verifica si el campo "email" contiene una dirección de correo electrónico válida
        if (req.body.email && !emailRegex.test(req.body.email)) {
            errors.push('La dirección de correo electrónico no es válida' );
        }

        const validRoles = ["customer", "user", "admin", "moderator"];
        if (!validRoles.includes(req.body.role)) {
            errors.push("El campo rol es incorrecto");
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const updatedUser = await Users.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}