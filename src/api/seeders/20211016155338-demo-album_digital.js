'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('album_digitals',
      [{
        nome: 'Jão da Silva',
        cpf:"12345678901",
        tel_whats:"67981250000",
        email: "jao@gmail.com",
        estado:"MS",
        cidade:"Campo Grande",
        data_nascimento: "1978-12-29",
        titulo_foto:"My Foto",
        nome_fotografa:"Jão",
        nome_foto:"jao.jpg",
        nome_responsavel:"",
        cpf_responsavel:"",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Zé dos Santos',
        cpf:"12345678902",
        tel_whats:"67981260001",
        email: "ze@gmail.com",
        estado:"MS",
        cidade:"Jardim",
        data_nascimento: "1980-08-25",
        titulo_foto:"My Foto 2",
        nome_fotografa:"Zé dos Santos",
        nome_foto:"ze.jpg",
        nome_responsavel:"",
        cpf_responsavel:"",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
