import { db } from '../lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ message: 'Faltan credenciales' });
  }

  try {
    const connection = await db();
    const [rows] = await connection.execute('SELECT * FROM Usuarios WHERE Usuario = ?', [user]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.Contraseña);

    if (!isMatch) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    return res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
}
