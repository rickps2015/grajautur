import express, { json } from 'express';
import { createConnection } from 'mysql2';
import routerRestaurante from './routes/restaurantes.js'; // Certifique-se de que a extensão .js esteja presente

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware para análise do corpo da solicitação (req.body)
app.use(json());

// Rotas da API
app.use('/api/restaurante', routerRestaurante);
// Adicione outras rotas conforme necessário

// Rota de teste
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'grajautur'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida!');
});

