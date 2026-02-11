const DB2REST_API_URL = 'https://your-db2rest-api-endpoint'; // Remplacez par l'URL de votre API DB2Rest

// Fonction pour sauvegarder un livre dans la liste de lecture
async function saveBookToDB2Rest(bookDetails) {
    try {
        const response = await fetch(`${DB2REST_API_URL}/reading-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-auth-token' // Remplacez par le jeton d'authentification de l'utilisateur
            },
            body: JSON.stringify(bookDetails)
        });

        return response.ok;
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du livre:', error);
        throw error;
    }
}

// Fonction pour récupérer la liste de lecture d'un utilisateur
async function fetchReadingList(userId) {
    try {
        const response = await fetch(`${DB2REST_API_URL}/reading-list?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer your-auth-token' // Remplacez par le jeton d'authentification de l'utilisateur
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de la liste de lecture');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération de la liste de lecture:', error);
        throw error;
    }
}

// Fonction pour supprimer un livre de la liste de lecture
async function deleteBookFromReadingList(bookId, userId) {
    try {
        const response = await fetch(`${DB2REST_API_URL}/reading-list/${bookId}?userId=${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer your-auth-token' // Remplacez par le jeton d'authentification de l'utilisateur
            }
        });

        return response.ok;
    } catch (error) {
        console.error('Erreur lors de la suppression du livre:', error);
        throw error;
    }
}