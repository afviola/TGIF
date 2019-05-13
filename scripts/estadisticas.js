"use strict";

const estadisticas = {
  "number-of-democrats": 0,
  "number-of-republicans": 0,
  "number-of-independents": 0,
  "total": 0,
  "democrats-average-votes-with-party": 0,
  "republicans-average-votes-with-party": 0,
  "independents-average-votes-with-party": 0,
  "least-engaged": [],
  "most-engaged": [],
  "least-loyal": [],
  "most-loyal": []
};

const miembrosTotales = {
  miembros: null,
  republicanos: null,
  democratas: null,
  independientes: null,

  inicializarMiembros: function() {
    this.miembros = data.results[0].members;
    this.republicanos = this.miembros.filter(m => m.party === "R");
    this.democratas = this.miembros.filter(m => m.party === "D");
    this.independientes = this.miembros.filter(m => m.party === "I");
  }
};

function votoPromedioConPartido(miembrosDeUnPartido) {
  return  miembrosDeUnPartido
            .map(miembro => miembro.votes_with_party_pct)
            .reduce((pct1, pct2) => pct1 + pct2) / miembrosDeUnPartido.length;
}

function get10PctMiembrosSegun(key, fnOrdenamiento) {
  let listado, valorLimite;

  listado = miembrosTotales.miembros;
  listado.sort(fnOrdenamiento);
  valorLimite = listado[Math.round(listado.length * 0.1) - 1][key];
  
  if (listado[0][key] >= valorLimite) {
    return listado.filter(m => m[key] >= valorLimite);
  } 

  return listado.filter(m => m[key] <= valorLimite);
}

function cargarEstadisticas() {
  estadisticas["number-of-democrats"] = miembrosTotales.democratas.length;
  estadisticas["number-of-independents"] = miembrosTotales.independientes.length;
  estadisticas["number-of-republicans"] = miembrosTotales.republicanos.length;
  estadisticas["total"] = miembrosTotales.miembros.length;

  estadisticas["independents-average-votes-with-party"] = votoPromedioConPartido(miembrosTotales.independientes);
  estadisticas["democrats-average-votes-with-party"] = votoPromedioConPartido(miembrosTotales.democratas);
  estadisticas["republicans-average-votes-with-party"] = votoPromedioConPartido(miembrosTotales.republicanos);

  estadisticas["most-engaged"] = get10PctMiembrosSegun("missed_votes_pct", (m1, m2) => m1.missed_votes_pct - m2.missed_votes_pct);
  estadisticas["least-engaged"] = get10PctMiembrosSegun("missed_votes_pct", (m1, m2) => m2.missed_votes_pct - m1.missed_votes_pct);

  estadisticas["least-loyal"] = get10PctMiembrosSegun("missed_votes", (m1, m2) => m2.missed_votes - m1.missed_votes);
  estadisticas["most-loyal"] = get10PctMiembrosSegun("missed_votes", (m1, m2) => m1.missed_votes - m2.missed_votes);
}

miembrosTotales.inicializarMiembros();
cargarEstadisticas();

console.log(estadisticas);
