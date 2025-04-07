import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'Email già registrata.' });
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email: email, password: hashedPassword });

        res.status(201).json({ message: 'Utente registrato con successo!', userId: newUser._id });
    } catch (err) {
        res.status(500).json({ message: 'Errore nel server scua.', error: err });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Credenziali non valide.' });
            return
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Credenziali non valide.' });
            return
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Errore nel server.', error: err });
    }
};
