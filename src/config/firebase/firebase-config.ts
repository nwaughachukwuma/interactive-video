// @ts-nocheck
export const firebase = window.firebase;
const firestore = window.firestore;

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { firestore, Timestamp, GeoPoint }

