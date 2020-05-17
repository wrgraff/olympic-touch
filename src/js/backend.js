(function() {
	window.backend = {
        sendForm: sendForm
	};
    
    function sendForm(data, url, onSuccess, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function() {
            if (xhr.status === 200) {
                onSuccess(xhr.response);
            } else {
                onError('При работе с сервером произошла ошибка. ' + xhr.status + ': ' + xhr.statusText + '. URL: ' + url);
            };
        });
        xhr.addEventListener('error', function() {
            onError('Соединиться с сервером не удалось');
        });
        xhr.addEventListener('timeout', function() {
            onError('Не удалось получить ответ от сервера за ' + xhr.timeout + 'мс');
        });

        xhr.timeout = 10000;
        xhr.open('POST', url);
        xhr.send(data);
    };
})();
