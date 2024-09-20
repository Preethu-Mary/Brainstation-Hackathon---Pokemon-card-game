document.addEventListener('DOMContentLoaded', () => {

    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=6&offset=2'; 
    const audio = document.getElementById('background-music');
    const soundToggleButton = document.getElementById('sound-toggle');
    const banner = document.getElementById("banner");
    const bannerMessage = document.getElementById("banner-message");

    let turnCount = 10;
    let selectedCards = [];
    let matchedCards = [];  
    let isSoundOn = false;
    sessionStorage.setItem('sound', 'off');

    // Function to toggle sound on and off
    function toggleSound() {
        if (isSoundOn) {
            audio.pause();
            soundToggleButton.classList.remove('fa-volume-up');
            soundToggleButton.classList.add('fa-volume-mute');
            sessionStorage.setItem('sound', 'on');
        } else {
            audio.play().catch(error => {
                console.error("Error playing audio:", error);
            });
            soundToggleButton.classList.remove('fa-volume-mute');
            soundToggleButton.classList.add('fa-volume-up');
            sessionStorage.setItem('sound', 'off');
        }
        isSoundOn = !isSoundOn;
    }
    soundToggleButton.addEventListener('click', toggleSound);

    //Function to fetch the pokemon cards from the API
    async function fetchPokemonList() {
        try {
            const response = await axios.get(apiUrl);
            console.log(response.data);
            return response.data.results;
        } catch (error) {
            console.error('There was a problem with the get operation pokemon list:', error);
        }
    }


    //Function to fetch the details of a pokemon card
    async function fetchPokemonData(pokemonUrl) {
        try {
            const response = await axios.get(pokemonUrl);
            return response.data;
        } catch (error) {
            console.error('There was a problem with the get operation of pokemon details:', error);
        }
    }


    //Function to shuffle the pokemon cards
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


    //Function to display the pokemon cards 
    async function displayPokemons() {
        const pokemons = await fetchPokemonList();
        
        if (!pokemons) return;

        const pokemonDetailsPromises = pokemons.map(pokemon => fetchPokemonData(pokemon.url));
        let pokemonDetails = await Promise.all(pokemonDetailsPromises);
        
        pokemonDetails = pokemonDetails.concat(pokemonDetails);  // Double the array
       
        shuffleArray(pokemonDetails); 
       
        // Function to create Pokémon cards
        function createPokemonCards(pokemonList) {
            const container = document.getElementById('pokemon-container');

            pokemonList.forEach((pokemonData, index) => {
                const pokemonCard = document.createElement('div');
                pokemonCard.classList.add('pokemon-card');
                pokemonCard.id = `card-${index}`; 

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

                const name = document.createElement('p');
                name.textContent = pokemonData.name;
                cardFront.appendChild(name);

                cardInner.appendChild(cardFront);
                cardInner.appendChild(cardBack);

                pokemonCard.appendChild(cardInner);

                container.appendChild(pokemonCard);

                pokemonCard.addEventListener('click', () => {
                    handleCardClick(pokemonCard, pokemonData);
                });
            });
        }

        createPokemonCards(pokemonDetails);
           
        const cards = document.querySelectorAll('.pokemon-card');
        cards.forEach(card => {
            card.classList.add('flipped');
        });

    }
   
    //Function to handle click event on a pokemon card
    function handleCardClick(pokemonCard, pokemonData) {
        if (selectedCards.length < 2 && !matchedCards.includes(pokemonData.name)) {
            pokemonCard.classList.remove('flipped');

            if (!selectedCards.includes(pokemonCard)) {
                selectedCards.push(pokemonCard);
            }

            if (turnCount > 0) {
                if (selectedCards.length === 2) {
                    checkMatch();
                    turnCount--;
                    document.getElementById("num__tries").innerText = turnCount;
                }
            }
            checkGameOver();   
            
        }
    }


    //Function to check if the selected cards match
    function checkMatch() {
        const cards = document.querySelectorAll('.pokemon-card');
        setTimeout(() => {
            if (selectedCards[0].querySelector('img').alt === selectedCards[1].querySelector('img').alt) {
                matchedCards.push(selectedCards[0].querySelector('img').alt);
                selectedCards = [];
            } else {
                cards.forEach(card => {
                    if (!matchedCards.includes(card.querySelector('img').alt)) {
                        card.classList.add('flipped');
                    }
                });

                selectedCards = [];
            }
        }, 1000);
    }

    function showBanner(message) {
        bannerMessage.innerText = message; 
        banner.classList.add('active');
    }

    function checkGameOver() {
        if (turnCount <= 0 && matchedCards.length !== 6) {
            showBanner("Try again!");
        } else if (matchedCards.length === 6){
            showBanner("You Win!");
        }
    }

    displayPokemons();
});
