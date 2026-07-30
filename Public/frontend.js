let idEditando = null;







function verGastos(){

    const lista = document.getElementById("lista-gastos");

    lista.innerHTML = "";

    fetch(`http://localhost:3000/gastos`)

    .then(respuesta => respuesta.json())

    .then(datos => {

        datos.forEach(gastos => {

            const item = document.createElement("li");

            item.textContent = `${gastos.descripcion} - $${gastos.monto} - ${gastos.categoria} - ${gastos.fecha}`

            const botonBorrar = document.createElement("button");
            botonBorrar.textContent = "Borrar";

            const botonEditar = document.createElement("button");
            botonEditar.textContent = "Editar";

            botonEditar.addEventListener("click", () =>{

                idEditando = gastos.id;

                document.getElementById("categoria").value = gastos.categoria;
                document.getElementById("monto").value = gastos.monto;
                document.getElementById("descripcion").value = gastos.descripcion;
                document.getElementById("fecha").value = gastos.fecha;

            });

            item.appendChild(botonEditar);

            botonBorrar.addEventListener("click", () => {
                borrarGasto(gastos.id);
            });

            item.appendChild(botonBorrar);

            lista.appendChild(item);

            })

        })

        .catch(error => console.error("Error:", error))


}


document.getElementById("form-gasto").addEventListener("submit", (evento) => {
    evento.preventDefault();

    const descripcion = document.getElementById("descripcion").value;
    const monto = document.getElementById("monto").value;
    const categoria = document.getElementById("categoria").value;
    const fecha = document.getElementById("fecha").value;

    if (idEditando === null) {

    fetch("http://localhost:3000/gastos", {
        
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ descripcion, monto, categoria, fecha})
    
    })

    .then(respuesta => respuesta.json())
    .then(() => {
        verGastos();
        evento.target.reset();
    })

    .catch(error => console.error("Error", error));


} else {

    fetch(`http://localhost:3000/gastos/${idEditando}`, {

        method: "PUT",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ descripcion, monto, categoria, fecha})
    })
    .then(respuesta => respuesta.json())
    .then(() => {

        idEditando = null;
        verGastos();
        evento.target.reset();

    })
    .catch(error => console.error("Error:", error));

}


});


function borrarGasto(id) {

    fetch(`http://localhost:3000/gastos/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        verGastos();
    })
    .catch(error => console.error("Error", error));
}




verGastos();