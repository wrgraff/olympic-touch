(function() {
	const form = document.querySelectorAll('.form');
	const modalTemplate = document.querySelector('#modal').content.querySelector('#modal-window');

	form.forEach(form => {
		form.addEventListener('submit', (evt) => {
			evt.preventDefault();

			window.backend.sendForm(new FormData(form), 'http://localhost:3000' + form.getAttribute('action') + 'response.json', function(response) {
				window.modal.show(createResponseText(response), true);
			}, function(errorText) {
				window.modal.show(createResponseText(response), true);
			});
		})
	});

	function createResponseText({status, heading, text, comment, contacts}) {
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
		}

		if (comment) {
			let responseComment = window.utils.addElement('p', 'response__comment');
			responseComment.textContent = comment;
			responseContainer.append(responseComment);
		}

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
				let responseButton = window.utils.addElement('a', 'response__button button button_secondary');
				responseButton.href = '/';
				responseButton.textContent = 'Вернуться на главную';
				responseContainer.append(responseButton);
			} else {
				let responseButton = window.utils.addElement('button', 'response__button button button_secondary');
				responseButton.type = 'button';
				responseButton.dataset.micromodalClose = 'true';
				responseButton.textContent = 'Вернуться к форме';
				responseContainer.append(responseButton);
			}
		};

		return responseContainer;
	};
})();
