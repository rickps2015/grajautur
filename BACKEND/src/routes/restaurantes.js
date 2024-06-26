import { Router } from 'express';
const router = Router();
import { listarRestaurantes, buscarRestaurantePorId, criarRestaurante, atualizarRestaurante, excluirRestaurante } from '../models/Restaurante.js';

// Rota para listar todos os restaurantes
router.get('/', async (req, res) => {
    try {
        const restaurantes = await listarRestaurantes();
        res.json(restaurantes);
    } catch (error) {
        console.error('Erro ao listar restaurantes:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar restaurantes.' });
    }
});

// Rota para buscar um restaurante por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurante = await buscarRestaurantePorId(id);
        if (!restaurante) {
            return res.status(404).json({ mensagem: 'Restaurante não encontrado.' });
        }
        res.json(restaurante);
    } catch (error) {
        console.error('Erro ao buscar restaurante por ID:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar restaurante.' });
    }
});

// Rota para criar um novo restaurante
router.post('/', async (req, res) => {
    const { nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por } = req.body;
    try {
        const novoRestaurante = await criarRestaurante(nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por);
        res.status(201).json(novoRestaurante);
    } catch (error) {
        console.error('Erro ao criar restaurante:', error);
        res.status(500).json({ mensagem: 'Erro ao criar restaurante.' });
    }
});

// Rota para atualizar um restaurante existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por } = req.body;
    try {
        const restauranteAtualizado = await atualizarRestaurante(id, nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por);
        if (!restauranteAtualizado) {
            return res.status(404).json({ mensagem: 'Restaurante não encontrado.' });
        }
        res.json(restauranteAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar restaurante:', error);
        res.status(500).json({ mensagem: 'Erro ao atualizar restaurante.' });
    }
});

// Rota para excluir um restaurante
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restauranteExcluido = await excluirRestaurante(id);
        if (!restauranteExcluido) {
            return res.status(404).json({ mensagem: 'Restaurante não encontrado.' });
        }
        res.json({ mensagem: 'Restaurante excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir restaurante:', error);
        res.status(500).json({ mensagem: 'Erro ao excluir restaurante.' });
    }
});

export default routerRestaurante;
