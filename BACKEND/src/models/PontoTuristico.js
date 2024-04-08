import { execute } from '../config/database.js';

class Banho {
    static async listarBanhos() {
        const [rows] = await execute('SELECT * FROM banhos');
        return rows;
    }

    static async buscarBanhoPorId(id) {
        const [rows] = await execute('SELECT * FROM banhos WHERE id = ?', [id]);
        return rows[0];
    }

    static async criarBanho(nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por) {
        const [result] = await execute('INSERT INTO banhos (nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por]);
        return { id: result.insertId, nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por };
    }

    static async atualizarBanho(id, nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por) {
        await execute('UPDATE banhos SET nome = ?, endereco = ?, telefone = ?, latitude = ?, longitude = ?, link_site = ?, horario_inicio = ?, horario_fim = ?, dia_funcionamento = ?, criado_por = ? WHERE id = ?', [nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por, id]);
        return { id, nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por };
    }

    static async excluirBanho(id) {
        await execute('DELETE FROM banhos WHERE id = ?', [id]);
        return true;
    }
}

export default Banho;
