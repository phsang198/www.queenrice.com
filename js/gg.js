function googleTranslateElementInit() {
    //const cachedLanguage = localStorage.getItem('selectedLanguage');
    //if (cachedLanguage) 
    //{
        new google.translate.TranslateElement(
            { pageLanguage: 'en' },
            'google_translate_element'
        );
    //}
}
function getSelectedLanguage() 
{
    const translateElement = document.getElementById('google_translate_element');

    const selectedLanguage = translateElement.querySelector('.goog-te-combo').value;

    //console.log('da cache ngon ngu : ' + selectedLanguage);
    localStorage.setItem('selectedLanguage', selectedLanguage);
}

function setLanguage(language) {
    console.log('ngon ngu trong cache la : ' +language);

    const translateElement = document.getElementById('google_translate_element');

    const comboElement = translateElement.querySelector('.goog-te-combo');
    comboElement.value = language;

    const event = new Event('change');
    comboElement.dispatchEvent(event);
}

const selectLanguageButton = document.getElementById('google_translate_element');
selectLanguageButton.addEventListener('click', getSelectedLanguage);
