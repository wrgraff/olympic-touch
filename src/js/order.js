'use strict';

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
	};

	function selectLengthsGroup(active) {
		lengths.forEach((group) => {
			if (active == group.dataset.subscription) {
				group.querySelector('input:last-of-type').checked = 'true';
				group.classList.add('length__group_active');
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
})();
