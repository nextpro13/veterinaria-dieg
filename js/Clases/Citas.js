export default class Citas {
  constructor() {
      this.citas = []; // array vacío 
  }

  // Agrega new cita
  agregarCita(cita) {
      this.citas = [...this.citas, cita]; 
      console.log(this.citas); // Muestra el array actualizado en consola
  }

  // Elimina una cita array
  eliminarCita(id) {
      this.citas = this.citas.filter((cita) => cita.id !== id); // Filtra citas
  }

  // Edita cita en array
  editarCita(citaActualizada) {
      this.citas = this.citas.map((cita) =>
          cita.id == citaActualizada.id ? citaActualizada : cita 
      );
  }
}