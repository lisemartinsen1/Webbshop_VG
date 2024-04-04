

document.addEventListener("DOMContentLoaded", function () {
    
    const form = document.querySelector("form");

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validera epost
        const emailInput = document.querySelector("input[name='email']");
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue);
        
        if (!emailValue.includes("@") || emailValue.length > 50) {
            alert("Vänligen ange en giltig e-postadress (max 50 tecken).");
            return;    
        }


        //Validera förnamn
        const firstNameInput = document.querySelector("input[name='fname']");
        const firstNameValue = firstNameInput.value.trim();
        if (firstNameValue.length < 2 || firstNameValue.length > 50) {
            alert("Förnamn måste vara mellan 2 och 50 tecken långt.");
            return;
        }

        //Validera efternamn
        const lastNameInput = document.querySelector("input[name='lname']");
        const lastNameValue = lastNameInput.value.trim();
        if (lastNameValue.length < 2 || lastNameValue.length > 50) {
            alert("Efternamn måste vara mellan 2 och 50 tecken långt.");
            return;
        }

        // Validera address
        const addressInput = document.querySelector("input[name='address']");
        const addressValue = addressInput.value.trim();
        localStorage.setItem('address', addressValue);
        if (addressValue.length < 2 || addressValue.length > 50) {
            alert("Adress måste vara mellan 2 och 50 tecken långt.");
            return;
        }

        // Validera postnr
        const postalCodeInput = document.querySelector("input[name='postnummer']");
        const postalCodeValue = postalCodeInput.value.trim();
        localStorage.setItem('postalCode', postalCodeValue);
        if (postalCodeValue.length !== 5 || !/^\d{5}$/.test(postalCodeValue)) {
            alert("Postnummer måste vara 5 siffror.");
            return;
        }

        // Validera stad
        const cityInput = document.querySelector("input[name='stad']");
        const cityValue = cityInput.value.trim();
        localStorage.setItem('city', cityValue);
        if (cityValue.length < 2 || cityValue.length > 50) {
            alert("Stad måste vara mellan 2 och 50 tecken långt.");
            return;
        }

        // Validera land
        const countryInput = document.querySelector("input[name='land']");
        const countryValue = countryInput.value.trim();
        if (countryValue.length < 2 || countryValue.length > 50) {
            alert("Land måste vara mellan 2 och 50 tecken långt.");
            return;
        }

        // Validera telenr
        const phoneInput = document.querySelector("input[name='telenr']");
        const phoneValue = phoneInput.value.trim();
        if (!/^[0-9 -]{0,50}$/.test(phoneValue)) {
            alert("Vänligen ange ett giltigt telefonnummer (max 50 tecken).");
            return;
        }

        // Om allt stämmer!
        form.submit();
    });
});

