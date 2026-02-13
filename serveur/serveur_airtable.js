const express = require('express');
const Airtable = require('airtable');

const app = express();
const PORT = 3000;

// Configure Airtable avec l'API key et base ID
Airtable.configure({
    apiKey: 'VOTRE_API_KEY', // Remplacez par votre API key Airtable
    endpointUrl: 'https://api.airtable.com'
});

const base = Airtable.base('VOTRE_BASE_ID'); // Remplacez par votre Base ID

// Exemple d'endpoint pour récupérer des enregistrements
app.get('/api/livres', (req, res) => {
    const records = [];
    base('NomDeVotreTable') // Remplacez par le nom de votre table
        .select({ maxRecords: 10 }) // Limite le nombre d'enregistrements
        .eachPage(function page(partialRecords, fetchNextPage) {
            records.push(...partialRecords);
            fetchNextPage();
        }, function done(err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erreur Airtable' });
                return;
            }
            res.json(records);
        });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur Airtable lancé sur le port ${PORT}`)
});