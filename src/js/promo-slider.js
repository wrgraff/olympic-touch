const sliderList = document.querySelector('.slider__list');

if (sliderList) {
	const slider = tns({
		container: sliderList,
		controlsContainer: document.querySelector('.slider__controls'),
		autoplayButton: document.querySelector('.slider__autoplay'),
		autoplayText: ['<span class="visually-hidden">Старт</span>', '<span class="visually-hidden">Стоп</span>'],
		nav: false,
		items: 1,
		autoplay: true,
		center: true,
		responsive: {
			1208: {
				fixedWidth: 1200,
				gutter: 4
			}
		}
	});
};
