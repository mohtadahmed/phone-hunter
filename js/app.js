const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneData(data.data, dataLimit);
}

const displayPhoneData = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    // phonesContainer.classList.add('col');

    // Displaying 10 Phones per page only
    const showAllButton = document.getElementById('show-all');
    if(dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAllButton.classList.remove('d-none');
    }
    else{
        showAllButton.classList.add('d-none');
    }

    // If No phone found in the search
    const noPhoneFound = document.getElementById('no-phone-found-message');
    if(phones.length === 0){
        noPhoneFound.classList.remove('d-none');
    }
    else{
        noPhoneFound.classList.add('d-none');
    }
    
    // Get All phone data from Phones array
    phones.forEach(phone => {
        // console.log(phones)
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
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
    `;

    phonesContainer.appendChild(phonesDiv);

    });

    // Stop Spinner
    toggelSpinner(false);

}

// Function for Process the Search Button
const processSearch = (dataLimit) => {
    toggelSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// Event Listener by clicking the Search Button
document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
});

// Enter Event Handler
document.getElementById('search-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        processSearch(10);
    }
});


// Toggle Spinner Function
const toggelSpinner = isLoading => {
    const spinnerSection = document.getElementById('loader');

    if(isLoading === true){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}

// Click Handler for Show All Button
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
});


const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone)
    const phoneModalTitle = document.getElementById('phoneModalTitleLabel');
    phoneModalTitle.innerText = phone.name;
    const phoneModalImage = document.getElementById('modal-image');
    phoneModalImage.innerHTML = `
        <img src="${phone.image}">
    `
    const phoneDetailBody = document.getElementById('modal-details');
    phoneDetailBody.innerHTML = `
        <h6>Brand: ${phone.brand ? phone.brand : 'No Phone Brand Information'}</h6>
        <p>Release Date: ${phone.mainFeatures.releaseDate ? phone.mainFeatures.releaseDate : 'No Release Data Information'}</p>
        <p>Chipset : ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No Chipse Information'}</p>
        <p>Display: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No Display Information'}</p>
        <p>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No Storage Information'}</p>
        <p>Memory Details: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No Phone Memory Information'}</p>
        <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Connectivity Type: ${phone.others ? phone.others.USB : 'No Connectivity Information'}</p>
        <p>Sensors: ${phone.mainFeatures.sensors}</p>
    `
}

// Default Phone Data Loading 
loadPhones('apple');