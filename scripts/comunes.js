"use strict";

//objeto que dibuja/saca/ miembros de la tabla
const dibujaMiembros = {
  tabla: null,

  //tabla es la posicion donde voy a insertar los miembros
  setPosicionTabla: function(posicion) {
    this.tabla = posicion;
  },

  //agrega una fila en la tabla conteniendo los datos necesarios del miembro(nombre, partido, votos, etc)
  agregarMiembroEnTabla: function(miembro) {
    let nuevaFila = this.tabla.insertRow(-1);

    this.agregarDatoLinkEnFila(
      nuevaFila,
      miembro.first_name +
        " " +
        (miembro.middle_name || "") +
        " " +
        miembro.last_name,
      miembro.url
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

  agregarDatoLinkEnFila: function(fila, info, url) {
    let nuevoDato, nuevoLink;
    nuevoDato = this.agregarDatoEnFila(fila, info);
    nuevoLink = document.createElement('a');
    nuevoLink.setAttribute('href', url);
    nuevoLink.appendChild(nuevoDato.firstChild);
    nuevoDato.appendChild(nuevoLink);
    return nuevoDato;
  },

  quitarTodosLosMiembros: function() {
    while(this.tabla.childNodes.length > 0) {
      this.tabla.deleteRow(0);
    }
  },

  //limpia la tabla de miembros y coloca los nuevos segun los filtros actuales
  updateUI: function(miembrosFiltrados) {
    this.quitarTodosLosMiembros();
    miembrosFiltrados.forEach(m => this.agregarMiembroEnTabla(m));
  }
};

/*objeto que se encarga de escuchar lo que ocurre con los filtros en el HTML y
envia los miembros filtrados a dibujaMiembros para que los muestre*/
const filtrador = {
  miembros: null,

  //setea la lista inicial de miembros sobre la que se va a trabajar
  setMiembros: function(arrMiembros) {
    this.miembros = arrMiembros;
  },

  getMiembros: function() {
    return this.miembros;
  },

  getCheckboxesValues: function() {
    return Array.from(document.querySelectorAll('input[name="party-filter"]:checked')).map(check => check.value);
  },

  getStateFilterValue: function() {
    return document.querySelector('select').value;
  },

  filtrarMiembros: function() {
    let checkValues, stateFilterValue;

    checkValues = this.getCheckboxesValues();
    stateFilterValue = this.getStateFilterValue();

    return this.miembros.filter(miembro => (!stateFilterValue || miembro.state === stateFilterValue)) //filtro por estado tiene mayor prioridad
                        .filter(miembro => checkValues.includes(miembro.party)); //por partido                            
  }
};