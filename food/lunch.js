fetch('./lunch.json', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
   .then(response => response.json())
   .then(response => readfile(response))


function readfile(data) {
    for (let i = 0; i < data.cards.length; i++) {
        let card = document.createElement('a');
        card.classList.add('jsonCard')
        card.href = data.cards[i].link
    
        let title = document.createElement('h2');
        title.textContent = data.cards[i].title;
    
        let image = document.createElement('img');
        image.src = data.cards[i].image;

        let description = document.createElement('p');
        description.textContent = data.cards[i].description;        

        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(description)
        
        document.getElementById('jsonCardHolder').appendChild(card)
    }     
}
