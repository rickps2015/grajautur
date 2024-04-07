import { createPool } from 'mysql2/promise';

// Configurações da conexão com o banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'grajautur'
};

// Criar uma conexão com o banco de dados
const pool = createPool(dbConfig);

// Função para executar consultas SQL
const execute = async (query, values) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(query, values);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

// Exportar a função de execução de consultas SQL
export { execute };
