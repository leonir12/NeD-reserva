const album_digital = require('./AlbumRoute');
/**
Sintaxe de uma função qualquer: function() {}
Sintaxe de uma arrow function: () => {}
 */
module.exports = app => {
    app.use(album_digital);
}