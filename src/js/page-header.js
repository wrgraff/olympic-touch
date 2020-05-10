'use strict';

(function(){
	const pageHeader = document.querySelector('.page-header'),
		  openButton = document.querySelector('.mobile-bar__menu'),
		  closeButton = document.querySelector('.page-header__close');

	if (pageHeader && openButton && closeButton) {
		const mask = window.utils.addElement('button', 'mask');
		mask.setAttribute('type', 'button');
		mask.addEventListener('click', closeMenu);
		document.body.append(mask);

		openButton.addEventListener('click', openMenu);
		closeButton.addEventListener('click', closeMenu);
	};
	
	function openMenu(evt) {
		evt.preventDefault();
		pageHeader.classList.add('page-header_opened');
		mask.classList.add('mask_opened');
	};

	function closeMenu(evt) {
		evt.preventDefault();
		pageHeader.classList.remove('page-header_opened');
		mask.classList.remove('mask_opened');
	};
})();
