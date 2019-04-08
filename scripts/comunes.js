"use strict";

//objeto que agrega/saca/filtra miembros de la tabla
const gestorMiembros = {
  posicionInsercion: undefined,
  miembros: undefined,

  setPosicionDondeInsertar: function(pos) {
    this.posicionInsercion = pos;
  },

  //el array debe contener todos los miembros disponibles
  setArrayMiebros: function(arr) {
    this.miembros = arr;
  },

  getMemberFullName: function(miembro) {
    return (
      miembro.first_name +
      " " +
      (miembro.middle_name || "") +
      " " +
      miembro.last_name
    );
  },

  //cada fila contiene la info personal de un funcionario
  agregarFilaMiembro: function(miembro) {
    let nuevaFila = document.createElement("tr");

    this.agregarCeldaLink(
      nuevaFila,
      this.getMemberFullName(miembro),
      miembro.url
    );
    this.agregarCelda(nuevaFila, miembro.party);
    this.agregarCelda(nuevaFila, miembro.state);
    this.agregarCelda(nuevaFila, miembro.seniority);
    this.agregarCelda(nuevaFila, miembro.votes_with_party_pct + "%");
    this.posicionInsercion.appendChild(nuevaFila); //miembro agregado
  },

  //inserta un TD con la info a insertar en la row indicada, retorna el TD creado
  agregarCelda: function(row, textInfo) {
    let nuevoTD = document.createElement("td");

    nuevoTD.appendChild(document.createTextNode(textInfo));
    row.appendChild(nuevoTD);

    return nuevoTD;
  },

  //inserta un td cuyo textInfo sera un link a la url indicada. retorna el TD creado
  agregarCeldaLink: function(row, textInfo, url) {
    let nuevoTD, nuevoLink;

    nuevoTD = this.agregarCelda(row, textInfo);

    nuevoLink = document.createElement("a");
    nuevoLink.setAttribute("href", url);

    nuevoLink.appendChild(nuevoTD.firstChild);
    nuevoTD.appendChild(nuevoLink);

    return nuevoTD;
  },
  
  agregarTodosLosMiembros: function() {
    this.miembros.forEach(m => gestorMiembros.agregarFilaMiembro(m));
  },

  filterMembersBy: function(condicion) {
    return this.miembros.filter(m => condicion(m));
  }
};

const condicionesFiltrado = {
  esRepublicano: function(miembro) {
    return miembro.party === 'R';
  },

  esDemocrata: function(miembro) {
    return miembro.party === 'D';
  },

  esIndependiente: function(miembro) {
    return miembro.party === 'I';
  },

  stateAll: function(miembro) {
    return true;
  }
};
