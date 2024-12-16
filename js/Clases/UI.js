import { eliminarCita, cargarEdicion, DB } from "../funciones.js";
import { contenedorCitas, heading } from "../selectores.js";

export default class UI {
  imprimirAlerta(mensaje, tipo) {
    // Contiene mensaje dentro al crear un DIV
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    divMensaje.textContent = mensaje;

    //agregar el mensaje al DOM
    document
      .querySelector("#contenido")
      .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

    // Alerta 5 seg.
    setTimeout(() => {
      divMensaje.remove();
    }, 5000);
  }

  // Accede directo al arreglo de citas
  imprimirCitas() {
    this.limpiarHTML();

    this.textoHeading();

    //lee el contenido BD
    const objectStore = DB.transaction("citas").objectStore("citas");

    const fnTextoHeading = this.textoHeading;
    const total = objectStore.count();
    total.onsuccess = function () {
      // console.log(total.result);
      fnTextoHeading(total.result);
    };

    //Se encarga todos los elementos BD
    objectStore.openCursor().onsuccess = function (e) {
      const cursor = e.target.result;

      if (cursor) {
        // destructuramos los elementos de BD
        const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
          cursor.value;
        // cda cita en un DIV con ID propio
        const divCita = document.createElement("div");
        divCita.classList.add("cita", "p-3");
        divCita.dataset.id = id;

        //Mascota
        const mascotaParrafo = document.createElement("h2");
        mascotaParrafo.classList.add("card-title", "font-weight-bolder");
        mascotaParrafo.textContent = mascota;

        //propietario
        const propietarioParrafo = document.createElement("p");
        propietarioParrafo.innerHTML = `
        <span class="font-weight-bolder">Propietario: </span> ${propietario}
      `;

        //telefono
        const telefonoParrafo = document.createElement("p");
        telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">Telefono: </span> ${telefono}
      `;

        //fecha
        const fechaParrafo = document.createElement("p");
        fechaParrafo.innerHTML = `
        <span class="font-weight-bolder">Fecha: </span> ${fecha}
      `;

        //hora
        const horaParrafo = document.createElement("p");
        horaParrafo.innerHTML = `
        <span class="font-weight-bolder">Hora: </span> ${hora}
      `;

        //sintomas
        const sintomasParrafo = document.createElement("p");
        sintomasParrafo.innerHTML = `
        <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
      `;

        // boton para eliminar cita
        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger", "mr-2");
        btnEliminar.innerHTML = `Eliminar`;
        btnEliminar.onclick = () => eliminarCita(id);

        // agrega un boton editar
        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-info");
        btnEditar.innerHTML = `Editar`;
        //pasa el objeto completo de cita como accion
        const cita = cursor.value;
        btnEditar.onclick = () => cargarEdicion(cita);

        //agrega los parrafos
        divCita.appendChild(mascotaParrafo);
        divCita.appendChild(propietarioParrafo);
        divCita.appendChild(telefonoParrafo);
        divCita.appendChild(fechaParrafo);
        divCita.appendChild(horaParrafo);
        divCita.appendChild(sintomasParrafo);
        divCita.appendChild(btnEliminar);
        divCita.appendChild(btnEditar);

        //agregar citas al HTML
        contenedorCitas.appendChild(divCita);

        // siguiente elemento
        cursor.continue();
      }
    };
  }

  textoHeading(resultado) {
    if (resultado > 0) {
      heading.textContent = "Administra tus Citas";
    } else {
      heading.textContent = "No hay citas, comienza creando una cita";
    }
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}
