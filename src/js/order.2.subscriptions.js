(function() {
	const subscriptions = document.querySelectorAll('.subscriptions__item input'),
		  lengths = document.querySelectorAll('.length__group');

	if (subscriptions[0] && lengths[0]) {
		selectLengthsGroup(subscriptions[0].value);
		subscriptions.forEach((subscription, i, subscriptions) => {
			subscription.addEventListener('click', () => {
				selectSubscription(subscriptions, subscription);
				selectLengthsGroup(subscription.value);
			});
		});

		function selectLengthsGroup(active) {
			lengths.forEach((group) => {
				if (active == group.dataset.subscription) {
					let activeInput = group.querySelector('input:last-of-type');
					activeInput.checked = 'true';
					window.totalPrice.set(activeInput.dataset.price);

					group.classList.add('length__group_active');

					let lengthButton = group.querySelector('.length__button');
					let lengthConnector = group.querySelector('.length__connector');
					if (lengthButton && lengthConnector) {
						let groupWidth = lengthButton.parentElement.offsetWidth;
						lengthButton.move(groupWidth, 0, false);
						lengthConnector.resize(groupWidth, 0, false);
					};

					if (!group.isInited) {
						window.initLengthGroup(group);
						group.isInited = true;
					};
				} else {
					group.classList.remove('length__group_active');
				};
			});
		};

		function selectSubscription(subscriptions, activeSubscription) {
			subscriptions.forEach((subscription) => {
				subscription.parentElement.parentElement.classList.remove('subscriptions__item_active');
			});
			activeSubscription.parentElement.parentElement.classList.add('subscriptions__item_active');
		};
	};
})();
