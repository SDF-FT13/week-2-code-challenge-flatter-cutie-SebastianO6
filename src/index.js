
let animals = [];
let currentAnimal = null;

document.addEventListener("DOMContentLoaded", () => {
    fetch("https://repozz.vercel.app/characters")
        .then((res) => res.json())
        .then((data) => {
            animals = data; 
            if (animals.length > 0) {
                currentAnimal = animals[0];
                handleClick(currentAnimal);
            }
            fillAnimalBar();
        })
        .catch((err) => console.log("Error fetching characters:", err));
});



function fillAnimalBar () {
    const characterMenu = document.getElementById("character-bar");
    characterMenu.innerHTML = "";

    animals.forEach(character => {
        let span = document.createElement("span");
        span.textContent = character.name;
        span.classList.add("character-name")
        span.addEventListener("click" , () => handleClick(character));
        characterMenu.appendChild(span);
    });
}

function handleClick(character) {
    document.getElementById("name").textContent = character.name;
    document.getElementById("vote-count").textContent = character.votes;
    
    const image = document.getElementById("image");
    if (character.image) {
        image.src = character.image;
        image.alt = character.name;
    } else {
        image.src = "default-placeholder.png"; 
        image.alt = "Image not available";
    }

    currentAnimal = character;
}

document.getElementById("votes-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const votesToAdd = parseInt(document.getElementById("votes").value);
    if (currentAnimal) {
        document.getElementById("vote-count").textContent = currentAnimal.votes += votesToAdd;
        e.target.reset(); 
    }
});



document.getElementById("reset-btn").addEventListener("click", () => {
    if (currentAnimal) {
        currentAnimal.votes = 0; 
        document.getElementById("vote-count").textContent = 0; 
    }
});

