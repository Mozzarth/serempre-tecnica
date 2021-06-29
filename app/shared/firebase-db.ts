import admin from 'firebase-admin'

const serviceAccount = require("./serempre-tecnica-fr.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://serempre-tecnica-default-rtdb.firebaseio.com/"
})
const db = admin.database()
export { admin as adminFirebase}