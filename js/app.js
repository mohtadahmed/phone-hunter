const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneData(data.data);
}

const displayPhoneData = phones => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // phonesContainer.classList.add('col');
    
    phones.forEach(phone => {
        console.log(phones)
        const phonesDiv = document.createElement('div');
        phonesDiv.classList.add('col')
        phonesDiv.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top p-5" alt="...">
            <hr>
            <div class="card-body">
                <h4 class="card-title">${phone.phone_name}</h4>
                <h6>${phone.brand}</h6>
                <p class="card-text">${phone.slug} <br> This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
    `;

    phonesContainer.appendChild(phonesDiv);

    });

}

document.getElementById('btn-search').addEventListener('click', function(){
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
})


loadPhones();