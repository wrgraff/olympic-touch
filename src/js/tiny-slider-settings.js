const sliderList = document.querySelector('.slider__list');
const actionsSlider = document.querySelector('.actions__slider');

if (sliderList) {
	const slider = tns({
		container: sliderList,
		controlsContainer: document.querySelector('.slider__controls'),
		autoplayButton: document.querySelector('.slider__autoplay'),
		autoplayText: ['<span class="visually-hidden">Старт</span>', '<span class="visually-hidden">Стоп</span>'],
		nav: false,
		items: 1,
		autoplay: true,
		autoWidth: true,
		center: true,
		responsive: {
			1208: {
				gutter: 4
			}
		}
	});
};

if (actionsSlider) {
	const sliderActions = tns({
		container: actionsSlider,
		controls: false,
		navContainer: document.querySelector('.actions__nav'),
		loop: false,
		items: 1
	});
};
