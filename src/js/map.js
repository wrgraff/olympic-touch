(function () {
    const mapScript = window.utils.addElement('script');
    const apiKey = '5d232e87-270c-4379-9807-c4135a027fee';
    mapScript.src = 'https://api-maps.yandex.ru/2.1/?apikey=' + apiKey + '&lang=ru_RU';

    if (sessionStorage.isScriptsLoaded) {
        appendScripts();
    } else {
        document.addEventListener('scroll', appendScripts);
        document.addEventListener('mousemove', appendScripts);
        document.addEventListener('click', appendScripts);
    };
    
    function appendScripts() {
        document.body.append(mapScript);

        sessionStorage.isScriptsLoaded = true;
        document.removeEventListener('scroll', appendScripts);
        document.removeEventListener('mousemove', appendScripts);
        document.removeEventListener('click', appendScripts);
    };

    mapScript.onload = function () {
        ymaps.ready(function(){
            const address = document.querySelector('.address__place').textContent;
            const map = new ymaps.Map(document.querySelector('.contact-info__map'), {
                zoom: 13,
                center: [59.863292, 30.17971]
            });

            // Поиск координат центра Нижнего Новгорода.
            ymaps.geocode(address, {
                results: 1
            }).then(function (result) {
                let placeObject = result.geoObjects.get(0);
                let coordinates = placeObject.geometry.getCoordinates();
                map.setCenter(coordinates);

                placeObject.options.set('preset', 'islands#redIcon');
                placeObject.properties.set('iconCaption', 'Olympic touch');

                map.geoObjects.add(placeObject);
            });
        });
    };
})();
