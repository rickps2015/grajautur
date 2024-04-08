import { execute } from '../config/database.js';

class Usuario {
    static async listarUsuarios() {
        const [rows] = await execute('SELECT * FROM usuarios');
        return rows;
    }

    static async buscarUsuarioPorId(id) {
        const [rows] = await execute('SELECT * FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    }

    static async criarUsuario(nome, email, senha, tipo) {
        const [result] = await execute('INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)', [nome, email, senha, tipo]);
        return { id: result.insertId, nome, email, tipo };
    }

    static async atualizarUsuario(id, nome, email, senha, tipo) {
        await execute('UPDATE usuarios SET nome = ?, email = ?, senha = ?, tipo = ? WHERE id = ?', [nome, email, senha, tipo, id]);
        return { id, nome, email, tipo };
    }

    static async excluirUsuario(id) {
        await execute('DELETE FROM usuarios WHERE id = ?', [id]);
        return true;
    }
}

export default Usuario;
