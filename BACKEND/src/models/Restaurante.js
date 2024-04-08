import { execute } from '../config/database.js';

class Restaurante {
    static async listarRestaurantes() {
        const [rows] = await execute('SELECT * FROM restaurantes');
        return rows;
    }

    static async buscarRestaurantePorId(id) {
        const [rows] = await execute('SELECT * FROM restaurantes WHERE id = ?', [id]);
        return rows[0];
    }

    static async criarRestaurante(nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por) {
        const [result] = await execute('INSERT INTO restaurantes (nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por]);
        return { id: result.insertId, nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por };
    }

    static async atualizarRestaurante(id, nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por) {
        await execute('UPDATE restaurantes SET nome = ?, endereco = ?, telefone = ?, latitude = ?, longitude = ?, link_site = ?, horario_inicio = ?, horario_fim = ?, dia_funcionamento = ?, criado_por = ? WHERE id = ?', [nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por, id]);
        return { id, nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por };
    }

    static async excluirRestaurante(id) {
        await execute('DELETE FROM restaurantes WHERE id = ?', [id]);
        return true;
    }
}

export default Restaurante;
