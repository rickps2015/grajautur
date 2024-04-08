import { Router } from 'express';
const router = Router();
import { listarBanhos, buscarBanhoPorId, criarBanho, atualizarBanho, excluirBanho } from '../models/Banho.js';

// Rota para listar todos os banhos
router.get('/', async (req, res) => {
    try {
        const banhos = await listarBanhos();
        res.json(banhos);
    } catch (error) {
        console.error('Erro ao listar banhos:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar banhos.' });
    }
});

// Rota para buscar um banho por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const banho = await buscarBanhoPorId(id);
        if (!banho) {
            return res.status(404).json({ mensagem: 'Banho não encontrado.' });
        }
        res.json(banho);
    } catch (error) {
        console.error('Erro ao buscar banho por ID:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar banho.' });
    }
});

// Rota para criar um novo banho
router.post('/', async (req, res) => {
    const { nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por } = req.body;
    try {
        const novoBanho = await criarBanho(nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por);
        res.status(201).json(novoBanho);
    } catch (error) {
        console.error('Erro ao criar banho:', error);
        res.status(500).json({ mensagem: 'Erro ao criar banho.' });
    }
});

// Rota para atualizar um banho existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por } = req.body;
    try {
        const banhoAtualizado = await atualizarBanho(id, nome, endereco, telefone, latitude, longitude, link_site, horario_inicio, horario_fim, dia_funcionamento, criado_por);
        if (!banhoAtualizado) {
            return res.status(404).json({ mensagem: 'Banho não encontrado.' });
        }
        res.json(banhoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar banho:', error);
        res.status(500).json({ mensagem: 'Erro ao atualizar banho.' });
    }
});

// Rota para excluir um banho
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const banhoExcluido = await excluirBanho(id);
        if (!banhoExcluido) {
            return res.status(404).json({ mensagem: 'Banho não encontrado.' });
        }
        res.json({ mensagem: 'Banho excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir banho:', error);
        res.status(500).json({ mensagem: 'Erro ao excluir banho.' });
    }
});

export default router;
