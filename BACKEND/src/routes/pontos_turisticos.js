import { Router } from 'express';
const router = Router();
import { listarPontosTuristicos, buscarPontoTuristicoPorId, criarPontoTuristico, atualizarPontoTuristico, excluirPontoTuristico } from '../models/PontoTuristico.js';

// Rota para listar todos os pontos turísticos
router.get('/', async (req, res) => {
    try {
        const pontosTuristicos = await listarPontosTuristicos();
        res.json(pontosTuristicos);
    } catch (error) {
        console.error('Erro ao listar pontos turísticos:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar pontos turísticos.' });
    }
});

// Rota para buscar um ponto turístico por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pontoTuristico = await buscarPontoTuristicoPorId(id);
        if (!pontoTuristico) {
            return res.status(404).json({ mensagem: 'Ponto turístico não encontrado.' });
        }
        res.json(pontoTuristico);
    } catch (error) {
        console.error('Erro ao buscar ponto turístico por ID:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar ponto turístico.' });
    }
});

// Rota para criar um novo ponto turístico
router.post('/', async (req, res) => {
    const { nome, endereco, descricao, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por } = req.body;
    try {
        const novoPontoTuristico = await criarPontoTuristico(nome, endereco, descricao, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por);
        res.status(201).json(novoPontoTuristico);
    } catch (error) {
        console.error('Erro ao criar ponto turístico:', error);
        res.status(500).json({ mensagem: 'Erro ao criar ponto turístico.' });
    }
});

// Rota para atualizar um ponto turístico existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, endereco, descricao, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por } = req.body;
    try {
        const pontoTuristicoAtualizado = await atualizarPontoTuristico(id, nome, endereco, descricao, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por);
        if (!pontoTuristicoAtualizado) {
            return res.status(404).json({ mensagem: 'Ponto turístico não encontrado.' });
        }
        res.json(pontoTuristicoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar ponto turístico:', error);
        res.status(500).json({ mensagem: 'Erro ao atualizar ponto turístico.' });
    }
});

// Rota para excluir um ponto turístico
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pontoTuristicoExcluido = await excluirPontoTuristico(id);
        if (!pontoTuristicoExcluido) {
            return res.status(404).json({ mensagem: 'Ponto turístico não encontrado.' });
        }
        res.json({ mensagem: 'Ponto turístico excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir ponto turístico:', error);
        res.status(500).json({ mensagem: 'Erro ao excluir ponto turístico.' });
    }
});

export default router;
