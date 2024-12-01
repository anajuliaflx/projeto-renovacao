// controllers/UserController.js
const AdminCadastroModel = require('../model/adminCadastroModel');

const AdminCadastroController = {
    register: (req, res) => {
        const { nome, email, senha, matricula, tipoUsuario } = req.body;
        
        AdminCadastroModel.findByEmailOrMatricula(email, matricula, (error, results) => {
            if (error) return res.status(500).json({ msg: 'Erro no servidor.' });
            
            if (results.length > 0) {
                return res.status(409).json({ msg: 'Email ou matrícula já cadastrados' });
            }
            
            AdminCadastroModel.createUser({ nome, email, senha, matricula, tipoUsuario }, (error) => {
                if (error) return res.status(500).json({ msg: 'Erro ao cadastrar usuário' });
                
                res.status(201).json({ msg: 'Usuário cadastrado com sucesso' });
            });
        });
    }
};

module.exports = AdminCadastroController;
