let arrayMiembros, tabla;

arrayMiembros = data.results[0].members;
tabla = document.querySelector('#senate-data table tbody');

gestorMiembros.setMiembros(arrayMiembros);
gestorMiembros.setPosicionTabla(tabla);
gestorMiembros.agregarTodosLosMiembros();

gestorMiembros.quitarTodosLosMiembros();