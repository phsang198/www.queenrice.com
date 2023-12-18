function googleTranslateElementInit() {
    const cachedLanguage = localStorage.getItem('selectedLanguage');
    if (cachedLanguage) 
    {
        new google.translate.TranslateElement(
            { pageLanguage: 'en' },
            'google_translate_element'
        );
        setTimeout(() => {
            setLanguage(cachedLanguage);
        }, 100);

        translatePage('en',cachedLanguage)
    }
    else
    {
        new google.translate.TranslateElement(
            { pageLanguage: 'en' },
            'google_translate_element'
        );
        setLanguage('en');
    }
}
function translatePage(defaultLanguage,targetLanguage) {
    var translateApiUrl = 'https://translation.googleapis.com/language/translate/v2?key=' + apiKey +
        '&source=' + defaultLanguage +
        '&target=' + targetLanguage +
        '&q=' + encodeURIComponent(document.documentElement.innerHTML);

    fetch(translateApiUrl, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data && data.data && data.data.translations && data.data.translations[0] && data.data.translations[0].translatedText) {
                document.documentElement.innerHTML = decodeURIComponent(data.data.translations[0].translatedText);
            }
        })
        .catch(error => console.error('Translation error:', error));
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
