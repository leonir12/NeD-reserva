/**
 * Validações na página quanto ao seu preenchimento
 */
$(function () {
  //Esconde os campos do responsável pelo menor de idade
  $('#div-nome-responsavel').hide();
  $('#div-cpf-responsavel').hide();
  //Próxima aba
  $('#botaoProximo').on('click',function () {
    $('#autorizacao-tab').trigger('click');
  });
  //Menor de idade (VALIDAR COM A DATA DO SERVIDOR)
  $('#dataNascimento').on('blur',function () {
    let d = new Date();
    let nA = $('#dataNascimento').val().split("-");
    let n = new Date(nA[1] + '-' + nA[2] + '-' + nA[0]);
    let ano = d.getFullYear() - n.getFullYear();
    let m = d.getMonth() - n.getMonth();
    if (m < 0 || (m === 0 && d.getDate() < n.getDate())) {
      ano--;
    }
    //mostra campos caso seja menor de idade
    if (ano < 18) {
      $('#div-nome-responsavel').show();
      $('#div-cpf-responsavel').show();
    } else {
      $('#div-nome-responsavel').hide();
      $('#div-cpf-responsavel').hide();
    }
  });
});

/**
 * Validações no formulário HTML para garantir integridade antes da submissão do formulario
 */
function validarFormulario(){
  //inserir as validações aqui e SE estiver tudo ok, chama a função de upload. 
  //Isso para garantir que o upload só acontecerá após o preenchimento de todo o formulário.

  var nome = document.querySelector('#nome').value
  var cpf = document.querySelector('#cpf').value
  var telWhats = document.querySelector('#telWhats').value
  var email = document.querySelector('#email').value
  var patt = /^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/;
  var dataNascimento = document.querySelector('#dataNascimento').value
  var nomeResponsavel = document.querySelector('#nomeResponsavel').value
  var cpfResponsavel = document.querySelector('#cpfResponsavel').value
  var tituloFoto = document.querySelector('#tituloFoto').value
  var nomeFotografa = document.querySelector('#nomeFotografa').value
  var nomeFoto = document.querySelector('#nomeFoto').value
  
  let d = new Date();
  let nA = $('#dataNascimento').val().split("-");
  let n = new Date(nA[1] + '-' + nA[2] + '-' + nA[0]);
  let ano = d.getFullYear() - n.getFullYear();
  let m = d.getMonth() - n.getMonth();
  if (m < 0 || (m === 0 && d.getDate() < n.getDate())) {
    ano--;
  }

  if (nome =="") {
      alert("Preencha seu nome")
      return false;
  }

  if (cpf.length != 11 && ano >= 18) {
      alert("Preencha o CPF corretamente")
      return false;
  }

  if (telWhats.length != 11) {
      alert("O telefone tem que ter 11 dígitos (DDD + número)")
      return false;
  }
  
  if (!patt.test(email)) {
      alert("Preencha o email corretamente")
      return false;
  }

  if (dataNascimento =="") {
      alert("Preencha a data de nascimento")
      return false;
  }

  if (ano < 18) {
      if(nomeResponsavel =="") {
          alert("Preencha o nome do responsável")
          return false;
      }
      if(cpfResponsavel.length != 11) {
          alert("Preencha o CPF do responsável corretamente")
          return false;
      }
  }

  if(tituloFoto =="") {
      alert("Insira o título da fotografia")
      return false;
  }
  
  if(nomeFotografa =="") {
      alert("Insira o nome do fotógrafo(a)")
      return false;
  }

  if(nomeFoto =="") {
      alert("Adicione uma foto")
      return false;
  }

  let validacaoOK = true;
  if (validacaoOK){
    uploadFile();
    return true;
  }
  return false;
}

/**
 * Função assíncrona com AJAX para realizar upload do arquivo (foto)
 */
//Função upload
function uploadFile() {
  //let arquivo = $(nomeFoto).val().split(/(\\|\/)/g).pop();
  $('#nomeFoto').clone().appendTo("#fileForm");

  let myForm = document.getElementById('fileForm');
  let formDataFile = new FormData(myForm);

  $.ajax({
    url: '/uploadFoto', // Url do lado server que vai receber o arquivo
    data: formDataFile,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function (data) {
      //retorno ao usuário depois da resposta do servidor
    }
  });
}