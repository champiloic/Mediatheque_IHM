document.getElementById('searchBtn').addEventListener('click', async function () {
    const query = document.getElementById('query').value;
    const resultElement = document.querySelector('.hint');

    if (query.trim() === '') {
        resultElement.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        const books = data.docs.slice(0, 5).map(book => {
            const title = book.title;
            const coverId = book.cover_i;
            const key = book.key;
            const coverImg = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : '';
            return `<div>
                        <p>${title}</p>
                        ${coverImg ? `<a href="./detail.html?key=${key}" target="_blank">
                                        <img src="${coverImg}" alt="${title}" />
                                      </a>` : ''}
                    </div>`;
        }).join('');
        resultElement.innerHTML = books || '<p>Aucun résultat trouvé.</p>';
    } catch (error) {
        resultElement.innerHTML = '<p>Erreur: ' + error.message + '</p>';
    }
});
