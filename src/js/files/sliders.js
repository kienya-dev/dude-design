import Swiper, { Navigation, Pagination } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('[data-post-slider]')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('[data-post-slider]', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination],
			slidesPerView: 1,
			spaceBetween: 20,
			autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,

			pagination: {
				el: '[data-post-slider-pagination]',
				clickable: true,
			},


			navigation: {
				prevEl: '[data-post-slider-left]',
				nextEl: '[data-post-slider-right]',
			},

		});
	}

	if (document.querySelector('[data-stories-slider]')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('[data-stories-slider]', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			autoHeight: true,
			speed: 800,
			slidesPerView: "auto",


			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '[data-stories-slider-left]',
				nextEl: '[data-stories-slider-right]',
			},
		});
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();

});