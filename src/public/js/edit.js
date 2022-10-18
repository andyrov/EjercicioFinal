window.addEventListener("load", function () {
    let formularioDelete = document.querySelector("form.delete");
    let formularioEdit = document.querySelector("form.edit");

    formularioDelete.addEventListener("submit", function () {
        alert('Se ha eliminado la pelicula con exito')
    });

    formularioEdit.addEventListener("submit", function () {
        alert('La pelicula se ha editado con exito')
    })
});