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

function cantidadMiembrosTotales() {
  return miembrosTotales.democratas.length + 
         miembrosTotales.independientes.length + 
         miembrosTotales.republicanos.length;
}

function votoPromedioConPartido(miembrosDelPartido) {
  return miembrosDelPartido
            .map(m => m.votes_with_party_pct)
            .reduce((pct1, pct2) => pct1 + pct2) / miembrosDelPartido.length;
}

const criteriosOrden = {
  miembrosMayorAMenorPartyPct: (m1, m2) => m1.votes_with_party_pct - m2.votes_with_party_pct,
  miembrosMenorAMayorPartyPct: (m1, m2) => m2.votes_with_party_pct - m1.votes_with_party_pct 
};



function leastEngagedMembers(porcentaje) {
  let posicionCritica, valorLimite, tamanioLista;

  miembrosTotales.miembros.sort((m1,m2) => m1.votes_with_party_pct - m2.votes_with_party_pct);
  tamanioLista = miembrosTotales.miembros.length;
  posicionCritica = Math.round(tamanioLista * (porcentaje/100)) - 1;
  valorLimite = miembrosTotales.miembros[posicionCritica].votes_with_party_pct;

  return miembrosTotales.miembros.filter(m => m.votes_with_party_pct <= valorLimite);
}

function mostEngagedMembers(porcentaje) {
  let posicionCritica, valorLimite, tamanioLista;

  miembrosTotales.miembros.sort((m1,m2) => m2.votes_with_party_pct - m1.votes_with_party_pct);
  tamanioLista = miembrosTotales.miembros.length;
  posicionCritica = Math.round(tamanioLista * (porcentaje/100)) - 1;
  valorLimite = miembrosTotales.miembros[posicionCritica].votes_with_party_pct;

  return miembrosTotales.miembros.filter(m => m.votes_with_party_pct >= valorLimite);
}

function leastLoyalMembers(porcentaje) {

}

function mostLoyalMembers(porcentaje) {

}

function cargarEstadisticas() {
  estadisticas["number-of-democrats"] = miembrosTotales.democratas.length;
  estadisticas["number-of-independents"] = miembrosTotales.independientes.length;
  estadisticas["number-of-republicans"] = miembrosTotales.republicanos.length;

  estadisticas["total"] = cantidadMiembrosTotales();

  estadisticas["independents-average-votes-with-party"] = votoPromedioConPartido(miembrosTotales.independientes);
  estadisticas["democrats-average-votes-with-party"] = votoPromedioConPartido(miembrosTotales.democratas);
  estadisticas["republicans-average-votes-with-party"] = votoPromedioConPartido(miembrosTotales.republicanos);
}

miembrosTotales.inicializarMiembros();
cargarEstadisticas();
console.log(mostEngagedMembers(10));








