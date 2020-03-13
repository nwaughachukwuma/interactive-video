export const firebase = window.firebase;
const firestore = window.firestore;
// if using Firebase JS SDK < 5.8.0
firestore.settings({ timestampsInSnapshots: true })

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { firestore, Timestamp, GeoPoint }

