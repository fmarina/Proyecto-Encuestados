/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      if(pregunta !== ""){
        if(respuestas.length > 0){
          this.modelo.agregarPregunta(pregunta, respuestas);
        }
        else{        
          alert("Deberias ingresar al menos una respuesta a votar");
        }        
      }else{
        alert("No has ingresado ninguna pregunta!!!");
      }      
  },

  editarPregunta: function(id){
    if(this.idValidator(id)) this.modelo.editarPregunta(id);
  },

  borrarPregunta: function(id){
    if(this.idValidator(id))  this.modelo.borrarPregunta(id);   
  },

  borrarTodasLasPreguntas: function(){
    this.modelo.borrarTodasLasPreguntas();
  },

  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    this.modelo.agregarVoto(nombrePregunta, respuestaSeleccionada);
  },

  idValidator: function(id){
    return (!isNaN(id) && id !== "" && id !== null) ? true : false;
  }

};

 
