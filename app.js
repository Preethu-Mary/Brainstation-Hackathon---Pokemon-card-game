document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=6&offset=2'; // URL to get a list of 6 Pokémon

    async function fetchPokemonList() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.results; // Contains the list of Pokémon
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    async function fetchPokemonData(pokemonUrl) {
        try {
            const response = await fetch(pokemonUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async function displayPokemons() {
        const pokemons = await fetchPokemonList();
        
        if (!pokemons) return;

        // Fetch detailed data for each Pokémon
        const pokemonDetailsPromises = pokemons.map(pokemon => fetchPokemonData(pokemon.url));
        let pokemonDetails = await Promise.all(pokemonDetailsPromises);
        
        // Double the array
        pokemonDetails = pokemonDetails.concat(pokemonDetails);

        // Shuffle the Pokémon details
        shuffleArray(pokemonDetails);

        // Function to create Pokémon cards
        function createPokemonCards(pokemonList) {
            const container = document.getElementById('pokemon-container');
            if (!container) {
                console.error('Container with ID "pokemon-container" not found.');
                return;
            }

            pokemonList.forEach(pokemonData => {
                const pokemonCard = document.createElement('div');
                pokemonCard.classList.add('pokemon-card');

                const cardInner = document.createElement('div');
                cardInner.classList.add('pokemon-card-inner');

                const cardFront = document.createElement('div');
                cardFront.classList.add('pokemon-card-front');

                const cardBack = document.createElement('div');
                cardBack.classList.add('pokemon-card-back');

                // Create and append Pokémon image to the front of the card
                const img = document.createElement('img');
                img.src = pokemonData.sprites.front_default; // Image URL
                img.alt = pokemonData.name;
                cardFront.appendChild(img);

                // Create and append Pokémon name to the back of the card
                const name = document.createElement('p');
                name.textContent = pokemonData.name;
                cardFront.appendChild(name);

                // Append front and back to cardInner
                cardInner.appendChild(cardFront);
                cardInner.appendChild(cardBack);

                // Append cardInner to the main card
                pokemonCard.appendChild(cardInner);

                // Append the card to the container
                container.appendChild(pokemonCard);

                // Add click event listener to the card
                pokemonCard.addEventListener('click', () => {
                    handleCardClick(pokemonCard, pokemonData);
                });
            });
        }

        // Display the Pokémon cards in a grid
        createPokemonCards(pokemonDetails);
           
        // Flip cards after 4 seconds
        setTimeout(() => {
            const cards = document.querySelectorAll('.pokemon-card');
            cards.forEach(card => {
                card.classList.add('flipped');
            });
        }, 3000);
    }
    let firstCard = null;
    let secondCard = null;
    let firstCardData;
    let secondCardData;
    
    function handleCardClick(pokemonCard, pokemonData) {
        if (!firstCard && !secondCard) {
            pokemonCard.classList.toggle('flipped');
            firstCard = pokemonCard;
            firstCardData = pokemonData;
            return
        }
        else if (firstCard && (!secondCard)) {
            pokemonCard.classList.toggle('flipped');
            secondCard = pokemonCard
            secondCardData = pokemonData;
            if (firstCardData.name !== secondCardData.name) {
                setTimeout(() => {
                    firstCard.classList.toggle('flipped');
                    secondCard.classList.toggle('flipped');
                    firstCard = null;
                    secondCard = null;
                }, 1000);
            }
        }
    }

    displayPokemons();
});
