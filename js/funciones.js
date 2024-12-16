import Citas from "./Clases/Citas.js";
import UI from "./Clases/UI.js";

import {
  mascotaInput,
  propietarioInput,
  telefonoInput,
  fechaInput,
  horaInput,
  sintomasInput,
  formulario,
} from "./selectores.js";

// objeto donde se guarda las citas
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

let editando;
export let DB;

// instanciamos las clases de manera global
const ui = new UI();
const administrarCitas = new Citas();


// Agrega datos
export function datosCita(e) {
  // Asigna el valor en el atributo 'name'
  citaObj[e.target.name] = e.target.value;
}

// Valida y agrega cita
export function nuevaCita(e) {
  e.preventDefault();

  // Extraer datos del objeto cita
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  // Valida que los campos no esten vacios
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.imprimirAlerta("Todos los campos son obligatorios", "error");
    return; 
  }

  // edicion
  if (editando) {
    console.log("modo edicion");

    // obejeto cita 
    administrarCitas.editarCita({ ...citaObj });

    // Edita en indexedDB
    const transaction = DB.transaction(["citas"], "readwrite");
    const objectStore = transaction.objectStore("citas");

    objectStore.put(citaObj);

    transaction.oncomplete = () => {
      // mensaje editdo
      ui.imprimirAlerta("Editado Correctamente");

      formulario.querySelector('button[type="submit"]').value = "Crear Cita";

      editando = false;
    };

    transaction.onerror = () => {
      console.log("Hubo un error!");
    };
  } else {
    // Nuevo registro
    console.log("modo nueva cita");

    // Generar un ID
    citaObj.id = Date.now();

    // Crea un cita pasa copia al objeto
    administrarCitas.agregarCita({ ...citaObj });

    // Registar datos en indexedDB
    const transaction = DB.transaction(["citas"], "readwrite");
    const objectStore = transaction.objectStore("citas");

    // Insertar BD
    objectStore.add(citaObj);

    // todo ok
    transaction.oncomplete = function () {
      console.log("cita agregada correctamente");
      ui.imprimirAlerta("Se agregó Correctamente");
    };

    transaction.onerror = () => {
      console.log("Hubo un error!");
    };
  }

  // Reinicia el objeto para la validación
  reiniciarCitaObj();

  // Limpia formulario luego agg nueva cita
  formulario.reset();

  // Mostrar las citas
  ui.imprimirCitas();
}

// Limpia el objeto para guardar new datos
export function reiniciarCitaObj() {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
}

// Elimina cita agregada
export function eliminarCita(id) {
  const transaction = DB.transaction(["citas"], "readwrite");
  const objectStore = transaction.objectStore("citas");

  objectStore.delete(id);

  transaction.oncomplete = () => {
    console.log(`cita ${id} eliminada...`);
    ui.imprimirAlerta("La cita se eliminó correctamente");
    ui.imprimirCitas(); 
  };

  transaction.onerror = () => {
    console.log("hubo un error");
  };
}

// Carga los datos y modo edicionn
export function cargarEdicion(cita) {
  // Extrae los elementos que recibe
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  // Llena los inputs con datosde objeto 
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  // Llenar el objeto con campos actuales
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  formulario.querySelector('button[type="submit"]').textContent =
    "Guardar Cambios";

  // Activar modo edición
  editando = true;
}

// Crea la BD
export function crearDB() {
  const crearDB = window.indexedDB.open("citas", 1);

  // Si hay un error
  crearDB.onerror = function () {
    console.log("hubo un error");
  };

  // Si no hay problemas
  crearDB.onsuccess = function () {
    console.log("DB creada");
    DB = crearDB.result;
    ui.imprimirCitas();
  };

  // Define el esquema
  crearDB.onupgradeneeded = function (e) {
    const db = e.target.result;

    const objectStore = db.createObjectStore("citas", {
      keyPath: "id",
      autoIncrement: true,
    });

    // Define las columnas
    objectStore.createIndex("mascota", "mascota", { unique: false });
    objectStore.createIndex("propietario", "propietario", { unique: false });
    objectStore.createIndex("telefono", "telefono", { unique: false });
    objectStore.createIndex("fecha", "fecha", { unique: false });
    objectStore.createIndex("hora", "hora", { unique: false });
    objectStore.createIndex("sintomas", "sintomas", { unique: false });
    objectStore.createIndex("id", "id", { unique: true });

    console.log("DB creado y listo");
  };
}