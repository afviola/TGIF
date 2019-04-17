
function gestionarAcordeon() {
    let link = document.getElementById('link-contenido-extra');
    if(link.innerHTML === 'Read more...') {
        link.innerHTML = 'Read less';
    } else {
        link.innerHTML = 'Read more...';
    }
}