
/**
 * Extracts the id and the content of a document from any collection of firebase.
 * @param {*} doc A document reference.
 * @returns An object with the id and the content of the given document.
 */
export const collectIdAndData = doc => {
  const data = doc.data();
  return {id: doc.id, ...data};
}