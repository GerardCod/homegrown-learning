import Swal from "sweetalert2";

/**
 * Extracts the id and the content of a document from any collection of firebase.
 * @param {*} doc A document reference.
 * @returns An object with the id and the content of the given document.
 */
export const collectIdAndData = doc => {
  const data = doc.data();
  return { id: doc.id, ...data };
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

/**
 * Creates a new comment object.
 * @param string comment
 * @param object user represents the currentUser data. 
 * @returns comment object.
 */
export const generateComment = (comment, user) => {
  const today = new Date();
  return {
    user: {
      name: user.name,
      avatar: user.avatar,
      email: user.email,
    },
    comment,
    postDate: today.toLocaleDateString('es-MX'),
    postTime: today.toLocaleTimeString('es-MX'),
  }
}

/**
 * Generates a new submit object
 * @param object submit content 
 * @param object user Current user data
 * @returns submit object
 */
export const generateSubmit = (submit, user) => {
  const today = new Date();
  return {
    user: {
      name: user.name,
      avatar: user.avatar,
      email: user.email,
    },
    submit,
    postDate: today.toLocaleDateString('es-MX'),
  }
}

export const generateEvidenceFile = (url, id, name) => {
  return {
    id,
    url,
    name
  }
}

/**
 * Retrieves a new Date object from a given date and time.
 * @author Gerardo Aguilar
 * @param {*} date String that contains the post date of the document.
 * @param {*} time String that contains the post time of the document.
 * @returns 
 */
export const getDateFromItem = (date, time) => {
  const dateSplited = date.split('/').reverse();
  const timeSplited = time.split(':');

  return new Date(
    +dateSplited[0],
    +dateSplited[1],
    +dateSplited[2],
    +timeSplited[0],
    +timeSplited[1],
    +timeSplited[2]
  );
}

/**
 * Sorts a collection of documents from firebase and returns the result.
 * @param {*} arr Collection of documents from firebase.
 * @returns a collection sorted by date.
 */
export const sortItems = arr => {
  return [...arr].sort((a, b) => {
    const dateA = getDateFromItem(a.postDate, a.postTime);
    const dateB = getDateFromItem(b.postDate, b.postTime);
    return dateB - dateA;
  });
}

export const linkRegex = /^https(.+?)+$/g;

export const detectAndCreateLinks = (data, propName = 'description') => {
  const words = data[propName].split(/[ \n]/);
  const dataCopy = {...data};
  for (let word of words) {
    if (word.match(linkRegex)) {
      dataCopy[propName] = dataCopy[propName].replace(word, `<a href=${word}>${word}</a>`);
    }
  }
  return dataCopy;
}