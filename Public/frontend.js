function verGastos(){

    const lista = document.getElementById("lista-gastos");

    lista.innerHTML = "";

    fetch(`http://localhost:3000/gastos`)

    .then(respuesta => respuesta.json())

    .then(datos => {

        datos.forEach(gastos => {

            const item = document.createElement("li");

            item.textContent = `${gastos.descripcion} - $${gastos.monto} - ${gastos.categoria} - ${gastos.fecha}`

            lista.appendChild(item);

            })

        })

        .catch(error => console.error("Error:", error))


}

verGastos();