(function(){
	const pageHeader = document.querySelector('.page-header');
	const openButton = document.querySelector('.mobile-bar__menu');
	const closeButton = document.querySelector('.page-header__close');

	if (pageHeader && openButton && closeButton) {
		const mask = window.utils.addElement('button', 'mask');
		mask.setAttribute('type', 'button');
		mask.addEventListener('click', function() {
			pageHeader.classList.remove('page-header_opened');
			mask.classList.remove('mask_opened');
		});
		document.body.append(mask);

		openButton.addEventListener('click', function() {
			pageHeader.classList.add('page-header_opened');
			mask.classList.add('mask_opened');
		});

		closeButton.addEventListener('click', function() {
			pageHeader.classList.remove('page-header_opened');
			mask.classList.remove('mask_opened');
		});
	};
})();
