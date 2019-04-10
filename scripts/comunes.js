"use strict";

//objeto que agrega/saca/filtra miembros de la tabla
const gestorMiembros = {
  miembros: null,
  tabla: null,

  setMiembros: function(arrMiembros) {
    this.miembros = arrMiembros;
  },

  //tabla es la posicion donde voy a insertar los miembros
  setPosicionTabla: function(posicion) {
    this.tabla = posicion;
  },

  //agrega una fila en la tabla conteniendo los datos necesarios del miembro(nombre, partido, votos, etc)
  agregarMiembroEnTabla: function(miembro) {
    let nuevaFila = this.tabla.insertRow(-1);

    this.agregarDatoEnFila(
      nuevaFila,
      miembro.first_name +
        " " +
        (miembro.middle_name || "") +
        " " +
        miembro.last_name
    );
    this.agregarDatoEnFila(nuevaFila, miembro.party);
    this.agregarDatoEnFila(nuevaFila, miembro.state);
    this.agregarDatoEnFila(nuevaFila, miembro.seniority);
    this.agregarDatoEnFila(nuevaFila, miembro.votes_with_party_pct + "%");
  },

  //Agrega un TD en la fila conteniendo la info y lo retorna
  agregarDatoEnFila: function(fila, info) {
    let nuevoDato = fila.insertCell(-1);
    nuevoDato.appendChild(document.createTextNode(info));
    return nuevoDato;
  },

  agregarTodosLosMiembros: function(miembrosFiltrados) {
    this.quitarTodosLosMiembros();
    miembrosFiltrados.forEach(m => this.agregarMiembroEnTabla(m));
  },

  quitarTodosLosMiembros: function() {
    while(this.tabla.childNodes.length > 0) {
      this.tabla.deleteRow(0);
    }
  }
};

let gestorFiltros = {
  getCheckboxesActivados: function() {
    return document.querySelectorAll('input[name=checkboxes]:checked');
  }
};