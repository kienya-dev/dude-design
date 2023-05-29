import Swiper, { Navigation, Pagination, Autoplay, EffectCards, FreeMode, Thumbs } from 'swiper';

import "../../scss/base/swiper.scss";
import "../../scss/libs/swiper.scss";
import 'swiper/css';

function initSliders() {
	if (document.querySelector('[data-article-slider-basic]')) {
		new Swiper('[data-article-slider-basic', {
			modules: [Pagination],
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 800,
			loop: true,
			pagination: {
				el: '[data-article-sliderbasic-pagination]',
				clickable: true,
			},
		});
	}

	if (document.querySelector('[data-article-sliderfull]')) {

		new Swiper("[data-article-sliderfull]", {
			modules: [Pagination],
			loop: true,
			spaceBetween: 20,
			pagination: {
				el: '[data-articleslider-full-pagination]',
				clickable: true,
				type: 'custom',
				bulletClass: 'article-slider__pag-img',
				bulletActiveClass: 'ddd'
			},
		});
	}

	if (document.querySelector('[data-choice-slider]')) {
		new Swiper('[data-choice-slider]', {
			spaceBetween: 8,
			speed: 800,
			slidesPerView: "auto",
		});
	}

	if (document.querySelector('[data-post-slider]')) {
		new Swiper('[data-post-slider]', {
			modules: [Navigation, Pagination],
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 800,
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

	if (document.querySelector('[data-dzen-slider]')) {
		new Swiper('[data-dzen-slider]', {
			autoHeight: true,
			speed: 800,
			slidesPerView: "auto",
			spaceBetween: 16,
		});
	}


	if (document.querySelector('[data-stories-slider]')) {
		new Swiper('[data-stories-slider]', {
			modules: [Navigation],
			autoHeight: true,
			speed: 800,
			slidesPerView: "auto",
			navigation: {
				prevEl: '[data-stories-slider-left]',
				nextEl: '[data-stories-slider-right]',
			},
		});
	}

	if (document.querySelector('[data-stories-carousel]')) {
		var carousel = new Swiper('[data-stories-carousel]', {
			effect: "fade",
			allowTouchMove: false,
			speed: 200,
			spaceBetween: 40,
			slidesPerView: 3,
			centeredSlides: true,
			clickable: true,

			breakpoints: {
				10: {
					slidesPerView: 1
				},

				991.98: {
					slidesPerView: 2
				},

				1399.98: {
					slidesPerView: 3
				}
			}
		});
	}


	if (document.querySelector('[data-story-slider]')) {
		const progressCircle = document.querySelector(".autoplay-progress svg");
		const progressContent = document.querySelector(".autoplay-progress span");
		new Swiper('[data-story-slider]', {
			effect: "fade",
			speed: 800,
			modules: [Autoplay, Pagination],
			delay: 4000,
			finite: true,
			loop: false,
			spaceBetween: 0,
			slidesPerView: 1,
			centeredSlides: true,
			clickable: true,

			pagination: {
				el: ".swiper-pagination",
				clickable: true
			},
			on: {
				autoplayTimeLeft(s, time, progress) {
					progressCircle.style.setProperty("--progress", 1 - progress);
					progressContent.textContent = `${Math.ceil(time / 1000)}s`;
				},
			}
		});
	}




	const authorizationPopup = document.querySelector('[data-popup-authorization]');
	const showAuthorizationPopupButton = document.querySelector('[data-authorization-button]');
	const storiesPopup = document.querySelector('[data-popup-stories]');

	const showPopup = (popup) => {
		const closeButton = popup.querySelector('[data-close]');
		popup.classList.add('popup_show');
		document.body.classList.add('lock');

		popup.addEventListener('click', (event) => {
			if (!event.target.closest('.popup__content')) {
				closePopup(popup);
			}
		});

		closeButton.addEventListener('click', () => closePopup(popup))
	}

	const closePopup = (popup) => {
		popup.classList.remove('popup_show')
		document.body.classList.remove('lock');
	}

	showAuthorizationPopupButton.addEventListener('click', () => showPopup(authorizationPopup));

	const storiesCards = document.querySelectorAll('.stories-card')
	storiesCards.forEach((card, idx) => card.addEventListener('click', () => {
		showPopup(storiesPopup);
		carousel.slideTo(idx);
	}))

	const slides = document.querySelectorAll('.stories-carousel__story');
	slides.forEach(function (slide, index) {
		slide.addEventListener('click', function () {
			carousel.slideTo(index);
		});
	});
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
});






