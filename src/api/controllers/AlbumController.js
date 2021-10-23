const database = require('../models');


class AlbumController {
    static async pegaTodosOsCadastros(req,res) {
        try {
            const todosOsCadastros = await database.album_digital.findAll();
            //return res.status(200).json(todosOsCadastros);
            res.render('albumView',{ todosOsCadastros });   
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmCadastro(req, res) {
        const { id } = req.params;
        try{
            const umCadastro = await database.album_digital.findOne( { 
                where: { 
                    id: Number(id) 
                } 
            });
            return res.status(200).json(umCadastro);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaCadastro(req, res) {
        const novoCadastro = req.body;
        console.log(req.body);
        try{
            const novoCadastroCriado = await database.album_digital.create(novoCadastro);
            return res.status(200).json(novoCadastroCriado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaCadastro(req, res) {
        const novasInfosCadastro = req.body;
        const { id } = req.params;
        try{
            await database.album_digital.update(novasInfosCadastro, { where: { id: Number(id) } });
            const cadastroAtualizado = await database.album_digital.findOne( { where: { id: Number(id) } });
            return res.status(200).json(cadastroAtualizado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async apagarCadastro(req, res) {
        const { id } = req.params;
        try{
            await database.album_digital.destroy({ where: { id: Number(id) } });
            return res.status(200).json( { mensagem: `id ${id} deletado`} );
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }  
}

module.exports = AlbumController