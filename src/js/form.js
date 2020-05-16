(function() {
	const form = document.querySelectorAll('.form');

	form.forEach(form => {
		form.addEventListener('submit', async (evt) => {
			evt.preventDefault();

			let response = await fetch(form.getAttribute('action') + 'response.json', {
				method: 'POST',
				body: new FormData(form)
			});

			let result = await response.json();
			alert(result.message);
		})
	});
})();
