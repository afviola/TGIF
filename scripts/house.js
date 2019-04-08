let arrayMiembros = data.results[0].members;

gestorMiembros.setArrayMiebros(arrayMiembros);
gestorMiembros.setPosicionDondeInsertar(document.querySelector('#house-data tbody'));
gestorMiembros.agregarTodosLosMiembros();