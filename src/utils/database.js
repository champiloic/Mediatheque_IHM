// database.js

// Nom de la base de données
const DB_NAME = 'UserDatabase';
const DB_VERSION = 1;
const STORE_NAME = 'users';

let db;

// Ouvre ou crée la base de données
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('Erreur lors de l\'ouverture de la base de données:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'username' });
            }
        };
    });
}

// Ajoute un utilisateur
async function addUser(username, password) {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const user = { username, password };
        store.add(user);
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        return false;
    }
}

// Vérifie si un utilisateur existe
async function userExists(username) {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(username);
        return new Promise((resolve) => {
            request.onsuccess = () => resolve(!!request.result);
            request.onerror = () => resolve(false);
        });
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur:', error);
        return false;
    }
}

// Valide un utilisateur (connexion)
async function validateUser(username, password) {
    try {
        const db = await openDB();
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(username);
        return new Promise((resolve) => {
            request.onsuccess = () => {
                const user = request.result;
                resolve(user && user.password === password);
            };
            request.onerror = () => resolve(false);
        });
    } catch (error) {
        console.error('Erreur lors de la validation de l\'utilisateur:', error);
        return false;
    }
}