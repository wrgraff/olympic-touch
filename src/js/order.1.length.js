(function() {
	function Range(label, button, connector) {
		this.min = label.offsetLeft || 0;
		this.max = label.offsetLeft + label.offsetWidth || 1000;
		this.center = (this.max - this.min) / 2 + this.min;
		this.input = label.parentElement.querySelector('#' + label.getAttribute('for'));

		this.isInRange = function(value) {
			return this.min <= value && this.max >= value;
		};
		this.check = function() {
			this.input.checked = true;
			button.move(this.calcPinPosition(), button.offsetLeft, true);
			connector.resize(this.calcPinPosition(), button.offsetLeft, true);
			window.totalPrice.set(this.input.dataset.price);
		};
		this.over = function() {
			label.classList.add('length__item_over');
		};
		this.disover = function() {
			label.classList.remove('length__item_over');
		};

		this.input.addEventListener('change', () => {
			if (this.input.checked) {
				button.move(this.calcPinPosition(), button.offsetLeft, true);
				connector.resize(this.calcPinPosition(), button.offsetLeft, true);
			};
		});
		this.calcPinPosition = function() {
			return this.isFirst ? 0 : this.isLast ? this.max - 12 : this.center;
		};
	};

	window.initLengthGroup = function(group) {
		if ((group.querySelectorAll('.length__item').length < 2) || (window.innerWidth < 768)) {
			return false;
		};

		const button = window.utils.addElement('button', 'length__button');
		button.setAttribute('type', 'button');
		button.setAttribute('aria-hidden', 'true');
		button.setAttribute('tabindex', '-1');
		button.move = function(to, from, animate = false) {
			if (animate) {
				this.animate(
					[
						{ left: from + 'px' },
						{ left: to + 'px' }
					], {
						duration: 200,
						easing: 'ease-in'
					}
				);
			};
			this.style.left = to + 'px';
		};

		const connector = window.utils.addElement('div', 'length__connector');
		connector.resize = function(to, from, animate = false) {
			if (animate) {
				this.animate([
					{ width: from + 'px' },
					{ width: to + 'px' }
					], {
						duration: 200,
						easing: 'ease-in'
					}
				);
			};
			this.style.width = to + 'px';
		};

		const months = group.querySelectorAll('.length__item');
		const monthsRanges = [];
		months.forEach((month, i, group) => {
			let range = new Range(month, button, connector);
			if (i === 0) { range.isFirst = true }
			else if (i === group.length - 1) { range.isLast = true }
			monthsRanges.push(range);
		});

		button.addEventListener('mousedown', (evt) => {
			evt.preventDefault();

			button.classList.add('length__button_active');
			document.addEventListener('mousemove', onMouseMove);
	
			var cursorPosition = evt.clientX;
			var buttonPosition = button.offsetLeft;
	
			function onMouseMove(moveEvt) {
				moveEvt.preventDefault();
	
				var shift = moveEvt.clientX - cursorPosition;
				var newButtonPosition = buttonPosition + shift;
	
				if (newButtonPosition >= 0 && newButtonPosition <= group.offsetWidth) {
					button.move(newButtonPosition);
					connector.resize(newButtonPosition);
					monthsRanges.forEach(range => {
						range.isInRange(button.offsetLeft) ? range.over() : range.disover();
					});
				};

				document.addEventListener('mouseup', onMouseUp);
			};

			function onMouseUp(upEvt) {
				upEvt.preventDefault();
				document.removeEventListener('mousemove', onMouseMove);
				document.removeEventListener('mouseup', onMouseUp);

				monthsRanges.forEach(range => {
					range.isInRange(button.offsetLeft) ? range.check() : false;
					range.disover();
				});
				button.classList.remove('length__button_active');
			};
		});

		group.append(button);
		group.append(connector);
	};
})();
