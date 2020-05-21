(function() {
	window.modal = {
        show: showModal
	};

	const modalTemplate = document.querySelector('#modal').content.querySelector('#modal-window');

	function showModal(content, isShrinked = false) {
		let modal = modalTemplate.cloneNode(true);
		let modalContainer = modal.querySelector('.modal__container');
		if (isShrinked) {
			modalContainer.classList.add('modal__container_shrinked');
		};
		modalContainer.append(content);
		document.body.append(modal);

		MicroModal.show('modal-window', {
			onClose: () => {
				setTimeout(removeModal, 400);
				modal.classList.add('is-close');
			}
		});

		function removeModal() {
			modal.remove();
		};
	};
})();
