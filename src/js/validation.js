(function() {
	const inputs = document.querySelectorAll('.field__input');

	inputs.forEach(input => {
		input.addEventListener('change', onInputChange);
		input.addEventListener('invalid', onInputChange);
	});

	function onInputChange(evt) {
		setStatus(evt.target);

		if (evt.target.validity.valid) {
			evt.target.removeEventListener('keyup', onInputKeyup);
		} else {
			evt.target.addEventListener('keyup', onInputKeyup);
		};
	};

	function onInputKeyup(evt) {
		setStatus(evt.target);
	};

	function setStatus(input) {
		if (input.validity.valid) {
			input.parentElement.classList.add('field_valid');
			input.parentElement.classList.remove('field_invalid');
			input.parentElement.dataset.error = '';
		} else {
			input.parentElement.classList.add('field_invalid');
			input.parentElement.classList.remove('field_valid');

			if (input.validity.patternMismatch || input.validity.typeMismatch) {
				input.parentElement.dataset.error = 'Использованы недопустимые для этого поля символы';
			} else if (input.validity.tooShort) {
				input.parentElement.dataset.error = 'Значение должно быть более ' + input.getAttribute('minlength') + ' символов';
			} else if (input.validity.rangeUnderflow && input.getAttribute('type') == 'date') {
				input.parentElement.dataset.error = 'Дата должна быть больше, чем ' + input.getAttribute('min').split('-').reverse().join('.');
			} else if (input.validity.rangeOverflow && input.getAttribute('type') == 'date') {
				input.parentElement.dataset.error = 'Дата должна быть меньше, чем ' + input.getAttribute('max').split('-').reverse().join('.');
			} else if (input.validity.valueMissing) {
				input.parentElement.dataset.error = 'Это поле обязательно для заполнения';
			} else {
				input.parentElement.dataset.error = 'Поле заполнено неверно';
			};
		};
	};
})();
