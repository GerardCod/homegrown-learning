import Swal from "sweetalert2";

/**
 * Extracts the id and the content of a document from any collection of firebase.
 * @param {*} doc A document reference.
 * @returns An object with the id and the content of the given document.
 */
export const collectIdAndData = doc => {
  const data = doc.data();
  return {id: doc.id, ...data};
}

/**
 * Shows a dialog with an error message.
 * @param {*} text Message text.
 * @param {*} title Message title
 * @returns Promise<void>
 */
export const onError = (text = 'Hubo un error en la operación', title = 'Lo siento mucho') => Swal.fire({
  title,
  text,
  icon: 'error',
}); 

/**
 * Shows a dialog with a success message.
 * @param {*} text Message text.
 * @param {*} title Message title.
 * @returns Promise<void>
 */
export const onSuccess = (text = 'Éxito en la operación', title = 'Felicidades') => Swal.fire({
  title,
  text,
  icon: 'success'
});

/**
 * Representa los roles que existen dentro de la plataforma.
 */
export const roles = {
  E: {
    name: 'Estudiante',
    slugName: 'E',
  },
  T: {
    name: 'Tutor',
    slugName: 'T'
  },
  D: {
    name: 'Docente',
    slugName: 'D'
  }
};