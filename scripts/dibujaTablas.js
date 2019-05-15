"use strict";

function agregarDatosEnTabla(tabla, ...datosDeFila) {
  let fila = tabla.insertRow(-1);

  datosDeFila.forEach(function(dato) {
    let celda = fila.insertCell(-1);
    celda.innerHTML = dato;
  });
}

function crearGlanceTable() {
  let tabla = document.getElementById('at-glance-table');
  agregarDatosEnTabla(tabla, "Democrats", estadisticas["number-of-democrats"], estadisticas["democrats-average-votes-with-party"]);
  agregarDatosEnTabla(tabla, "Republicans", estadisticas["number-of-republicans"], estadisticas["republicans-average-votes-with-party"]);
  agregarDatosEnTabla(tabla, "Independents", estadisticas["number-of-independents"], estadisticas["independents-average-votes-with-party"]);
}

function getNombreCompleto(miembro) {
  return miembro.first_name + " " + (miembro.middle_name || "") + " " + miembro.last_name;
}

function crearTablasGenericas() {
  let tablaLeast, tablaMost;

  tablaLeast = document.getElementById("least-table");
  tablaMost = document.getElementById("most-table");

  //determino si estoy en un html de tipo attendance o loyalty
  if (window.location.pathname.includes('attendance')) {
    estadisticas["least-engaged"].forEach(function(miembro) {
      agregarDatosEnTabla(tablaLeast, getNombreCompleto(miembro), miembro.missed_votes, miembro.missed_votes_pct);
    });

    estadisticas["most-engaged"].forEach(function(miembro) {
      agregarDatosEnTabla(tablaMost, getNombreCompleto(miembro), miembro.missed_votes, miembro.missed_votes_pct);
    });
  } else {
    estadisticas["least-loyal"].forEach(function(miembro) {
      agregarDatosEnTabla(tablaLeast, getNombreCompleto(miembro), miembro.missed_votes, miembro.missed_votes_pct);
    });
  
    estadisticas["most-loyal"].forEach(function(miembro) {
      agregarDatosEnTabla(tablaMost, getNombreCompleto(miembro), miembro.missed_votes, miembro.missed_votes_pct);
    });
  }
}

crearGlanceTable();
crearTablasGenericas();

