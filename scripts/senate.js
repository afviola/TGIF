let arrayMiembros = data.results[0].members;

gestorMiembros.setArrayMiebros(arrayMiembros);
gestorMiembros.setPosicionDondeInsertar(document.querySelector('#senate-data tbody'));
gestorMiembros.agregarTodosLosMiembros();