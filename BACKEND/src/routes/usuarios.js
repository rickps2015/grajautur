import { Router } from 'express';
const router = Router();
import { listarUsuarios, buscarUsuarioPorId, criarUsuario, atualizarUsuario, excluirUsuario } from '../models/Usuario.js';

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const usuarios = await listarUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar usuários.' });
    }
});

// Rota para buscar um usuário por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await buscarUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }
        res.json(usuario);
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar usuário.' });
    }
});

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    try {
        const novoUsuario = await criarUsuario(nome, email, senha, tipo);
        res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ mensagem: 'Erro ao criar usuário.' });
    }
});

// Rota para atualizar um usuário existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, tipo } = req.body;
    try {
        const usuarioAtualizado = await atualizarUsuario(id, nome, email, senha, tipo);
        if (!usuarioAtualizado) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }
        res.json(usuarioAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ mensagem: 'Erro ao atualizar usuário.' });
    }
});

// Rota para excluir um usuário
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuarioExcluido = await excluirUsuario(id);
        if (!usuarioExcluido) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }
        res.json({ mensagem: 'Usuário excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ mensagem: 'Erro ao excluir usuário.' });
    }
});

export default router;
