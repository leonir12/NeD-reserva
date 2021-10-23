//Importando o Router do express. 
// As chaves indicam que a propriedade Router de express será atribuída a uma constante de mesmo nome
const { Router } = require('express');
const AlbumController = require('../controllers/AlbumController');

//Iniciando o Router do express
const router = Router();

router.get('/album_digital', AlbumController.pegaTodosOsCadastros);
router.get('/album_digital/:id', AlbumController.pegaUmCadastro);
router.post('/album_digital', AlbumController.criaCadastro);
router.put('/album_digital/:id', AlbumController.atualizaCadastro);
router.delete('/album_digital/:id', AlbumController.apagarCadastro);

module.exports = router;