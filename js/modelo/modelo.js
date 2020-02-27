/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;
  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.todasLasPreguntasEliminadas = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);

  this.cargar(); 
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    // Lo que debe hacer esta función es buscar el id más alto y asignar ese id a la nueva pregunta. Para hacerlo vas a tener que recorrer la lista de preguntas del modelo.
    for(var i = 0; i < this.preguntas.length; i++){      
      if(this.preguntas[i].id > this.ultimoId){
        this.ultimoId = this.preguntas[i].id;
      }
    }    
    return this.ultimoId;   
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();    
    id++;    
    var nuevaPregunta = {'textoPregunta': nombre,'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  editarPregunta: function(id){
    var preguntaAEditar = this.preguntas.find(preg => preg.id === id);
    var pregEditada = prompt("Editar pregunta '" + preguntaAEditar.textoPregunta + "' por:");
    preguntaAEditar.textoPregunta = pregEditada;   
    this.guardar();   
    this.preguntaEditada.notificar();    
  },

  borrarPregunta: function(id){
    this.preguntas = this.preguntas.filter(pregunta => pregunta.id !== id);
    this.guardar();
    this.preguntaEliminada.notificar();   
  },

  borrarTodasLasPreguntas: function(){
    this.preguntas = [];    
    this.vaciarLocalStorage();
    this.todasLasPreguntasEliminadas.notificar();
  },

  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    this.preguntas.forEach(function(pregunta){      
      if(pregunta.textoPregunta === nombrePregunta){
        pregunta.cantidadPorRespuesta.forEach(function(respuesta){
          //recorro todas las respuestas
          if(respuesta.textoRespuesta == respuestaSeleccionada){
            respuesta.cantidad++;    
          }
        });
      }

    });
    this.votoAgregado.notificar();
    this.guardar();
  },
  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem("objetoPreguntas", JSON.stringify(this.preguntas));
  },

  cargar: function(){
    if(localStorage.getItem("objetoPreguntas") !== null){
      this.preguntas = JSON.parse(localStorage.getItem("objetoPreguntas"));
    }    
  },

  vaciarLocalStorage: function(){
    localStorage.setItem("objetoPreguntas", JSON.stringify([]));
  }
};