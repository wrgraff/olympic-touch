const actionsSlider = document.querySelector('.actions__slider');

if (actionsSlider) {
	const sliderActions = tns({
		container: actionsSlider,
		controls: false,
		navContainer: document.querySelector('.actions__nav'),
		loop: false,
		items: 1
	});
};
