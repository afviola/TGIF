let arrayMiembros, tabla;

arrayMiembros = data.results[0].members;
tabla = document.querySelector('#house-data table tbody');

filtrador.setMiembros(arrayMiembros);
dibujaMiembros.setPosicionTabla(tabla);

dibujaMiembros.updateUI(filtrador.filtrarMiembros());