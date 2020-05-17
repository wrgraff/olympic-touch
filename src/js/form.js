(function() {
	const form = document.querySelectorAll('.form');

	form.forEach(form => {
		form.addEventListener('submit', (evt) => {
			evt.preventDefault();

			window.backend.sendForm(new FormData(form), form.getAttribute('action') + 'response.json', function(response) {
				window.modal.show(createResponseText(response), true);
			}, function(errorText) {
				window.modal.show(errorText);
			});
		})
	});

	function createResponseText({status, heading, text, comment, contacts, error}) {
		let responseContainer = window.utils.addElement('div', 'response');
		responseContainer.classList.add('response_' + status);

		if (heading) {
			let responseHeading = window.utils.addElement('h2', 'modal__heading');
			responseHeading.textContent = heading;
			responseContainer.append(responseHeading);
		};

		if (text) {
			let responseText = window.utils.addElement('div', 'response__text');
			responseText.innerHTML = text;
			responseContainer.append(responseText);
		};

		if (error) {
			let responseDetails = window.utils.addElement('div', 'response__details');
			let responseDetailsText = window.utils.addElement('p', 'response__title');
			responseDetailsText.textContent = error.text;
			responseDetails.append(responseDetailsText);

			if (error.fields) {
				let responseDetailsList = window.utils.addElement('ul');

				error.fields.forEach((field, i, fields) => {
					let responseDetailsItem = window.utils.addElement('li');
					responseDetailsItem.textContent = (i + 1 < fields.length) ? field + ';' : field + '.';
					responseDetailsList.append(responseDetailsItem);
				});

				responseDetails.append(responseDetailsList);
			};

			responseContainer.append(responseDetails);
		};

		if (comment) {
			let responseComment = window.utils.addElement('p', 'response__comment');
			responseComment.textContent = comment;
			responseContainer.append(responseComment);
		};

		if (contacts) {
			let responseContacts = window.utils.addElement('ul', 'response__contacts contacts');

			contacts.forEach(contact => {
				let responseContactsItem = window.utils.addElement('li', 'contacts__item');
				let responseContactsLink = window.utils.addElement('a', 'contacts__link');
				responseContactsLink.textContent = contact.link;

				if (contact.type == 'email') {
					responseContactsLink.href = 'mailto:' + contact.link;
				} else if (contact.type == 'tel') {
					responseContactsLink.href = 'tel:' + contact.link.replace(/^[-+() ]*$/g, '');
				} else {
					responseContactsLink.href = contact.link;
				};

				responseContactsItem.append(responseContactsLink);
				responseContacts.append(responseContactsItem);
			});
			responseContainer.append(responseContacts);

			if (status == 'success') {
				let responseButton = window.utils.addElement('a', 'response__button button');
				responseButton.href = '/';
				responseButton.textContent = 'Вернуться на главную';
				responseContainer.append(responseButton);
			} else {
				let responseButton = window.utils.addElement('button', 'response__button button');
				responseButton.type = 'button';
				responseButton.dataset.micromodalClose = 'true';
				responseButton.textContent = 'Вернуться к форме';
				responseContainer.append(responseButton);
			}
		};

		return responseContainer;
	};
})();
