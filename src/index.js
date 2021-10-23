const express = require("express")
const app = express()
import path from 'path'
const multer = require('multer');

/**
 * Cria uma instância do middleware configurada
 * destination: lida com o destino
 * filenane: permite definir o nome do arquivo gravado
 */
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //Primeiro parâmetro = erro
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        //Primeiro parâmetro = erro
        //Salvando com name do input e data atual
        /* cb(null, file.fieldname + '-' + Date.now()) */

        //Salvando com a mesma extensão do arquivo
        /* cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) */

        //Salvando com o mesmo nome do arquivo
        cb(null, file.originalname);
    }
});

// utiliza a storage para configurar a instância do multer
const upload = multer({ storage });


/**
 * Configuração do parser para requisições post
 */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

/**
* Colocar servidor no ar
*/
const PORTA = process.env.PORT || 8080;
app.listen(PORTA, function () {
    console.log(`Servidor rodando na porta ${PORTA}`)
})

/**
 * caminhos estaticos
 */
 app.use('/publico', express.static(__dirname + '/publico'));
 app.use('/uploads', express.static('./uploads'));
 app.use('/bscss', express.static('./node_modules/bootstrap/dist/css'));
 app.use('/bsjs', express.static('./node_modules/bootstrap/dist/js'));
 app.use('/popperjs', express.static('./node_modules/@popperjs/core/dist/umd'));
 app.use('/jquery', express.static('./node_modules/jquery/dist'));

 /**
 * Requisição - Upload de arquivos
 */
app.post('/uploadFoto',upload.single('nomeFoto'),function(req, resp){
    resp.end();
});

/**
 * Rotas
 */
 const routes = require(__dirname +'/api/routes');
 routes(app);

 /**
 * Configurações das páginas
 */
app.set('views',path.join(__dirname,'api/views'))
app.set('view engine','pug')

app.get('/album',function(req, resp){
    resp.sendFile(__dirname + '/views/form-album-digital.html');
});

app.post('/album-digital',function(req, resp){
    
    //Conferir dados da requisição
    console.log(`
    req.body.nome = ${req.body.nome}
    req.body.cpf = ${req.body.cpf}
    req.body.telWhats = ${req.body.telWhats}
    req.body.email = ${req.body.email}
    req.body.estado = ${req.body.estado}
    req.body.cidade = ${req.body.cidade}
    req.body.dataNascimento = ${req.body.dataNascimento}
    req.body.nomeResponsavel = ${req.body.nomeResponsavel}
    req.body.cpfResponsavel = ${req.body.cpfResponsavel}
    req.body.tituloFoto = ${req.body.tituloFoto}
    req.body.nomeFotografa = ${req.body.nomeFotografa}
    req.body.nomeFoto = ${req.body.nomeFoto}
    `); 

    /*pool.query(`INSERT INTO album_digital 
                (nome, cpf, tel_whats, email, estado, cidade, data_nascimento, nome_responsavel, cpf_responsavel, titulo_foto, nome_fotografa, nome_foto) 
                VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, 
                [req.body.nome, req.body.cpf, req.body.telWhats, req.body.email, req.body.estado, req.body.cidade, req.body.dataNascimento, req.body.nomeResponsavel, req.body.cpfResponsavel, req.body.tituloFoto, req.body.nomeFotografa, req.body.nomeFoto])
        .then(res => console.log('ok'))
        .catch(err => console.log('erro: ' + err)); */
        

    resp.sendFile(__dirname + '/views/form-album-digital.html');
}); 

/* app.get('/teste', (req, res) => res
    .status(200)
    .send({
        mensagem: 'Bem vinda!!'
    }));  */