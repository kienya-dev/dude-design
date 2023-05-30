// Подключение основного файла стилей
import "../scss/style.scss";
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

import "../scss/base/swiper.scss";
import "../scss/libs/swiper.scss";
import 'swiper/css';

document.addEventListener('DOMContentLoaded', () => {
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
                    bulletActiveClass: ''
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
    }

    initSliders();

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
        const stories = document.querySelector('[data-popup-stories]');
        if (stories.classList.contains('popup_show')) {
            clearInterval(interval)
            activeStore.enabled = false;
            if (document.querySelector('[data-active-store]')) {
                const a = document.querySelector('[data-active-store] .swiper-wrapper')
                a.classList.add('sw_no_td')
                document.querySelector('[data-active-store]').removeAttribute('data-active-store')
            }
            bulletNumber = 0;
            carouselStories.enabled = true;
        }

        popup.classList.remove('popup_show');
        document.body.classList.remove('lock');
    }

    showAuthorizationPopupButton.addEventListener('click', () => showPopup(authorizationPopup));


    const closeStoriesPopup = () => {
        clearInterval(interval)
        activeStore.enabled = false;
        if (document.querySelector('[data-active-store]')) {
            const a = document.querySelector('[data-active-store] .swiper-wrapper');
            a.classList.add('sw_no_td');
            document.querySelector('[data-active-store]').removeAttribute('data-active-store');
        }
        bulletNumber = 0;
        closePopup(storiesPopup);
        carouselStories.enabled = true;
    }

    const toggleCarouselStore = (carouselStories) => {
        let idx = carouselStories.activeIndex;
        clearInterval(interval);
        activeStore.enabled = false;
        activeStore.destroy(true, true);

        if (document.querySelector('[data-active-store]')) {
            const a = document.querySelector('[data-active-store] .swiper-wrapper');
            a.classList.add('sw_no_td');
            document.querySelector('[data-active-store]').removeAttribute('data-active-store');
        }

        bulletNumber = 0;
        carouselStories.slideTo(idx);
        storeSlider[idx].setAttribute('data-active-store', 'true');
        storeSlider[idx].querySelector('.swiper-wrapper').classList.remove('sw_no_td');
        idxActiveSlide = idx;
        initStore();
    }

    const carouselStories = new Swiper('[data-stories-carousel]', {
        effect: "fade",
        modules: [Navigation],
        speed: 200,
        spaceBetween: 0,
        slidesPerView: 3,
        centeredSlides: true,
        clickable: true,
        navigation: {
            prevEl: '[data-stories-gallery-left]',
            nextEl: '[data-stories-gallery-right]',
        },
        breakpoints: {
            10: {
                slidesPerView: 1
            },

            639.98: {
                slidesPerView: 2
            },

            1399.98: {
                slidesPerView: 3
            }
        },

        on: {
            slideNextTransitionEnd: function (carouselStories) {
                toggleCarouselStore(carouselStories);
            },

            slidePrevTransitionEnd: function (carouselStories) {
                toggleCarouselStore(carouselStories);
            }
        }
    });

    let interval;
    const startInterval = (activeBullet, bullets = []) => {
        let width = 0;
        interval = setInterval(() => {
            if (width > 101) {
                clearInterval(interval);
                if (bullets.length == 1) {
                    if (storiesCards.length - 1 !== idxActiveSlide) {
                        activeStore.destroy(true, true);
                        if (document.querySelector('[data-active-store]')) {
                            const a = document.querySelector('[data-active-store] .swiper-wrapper');
                            a.classList.add('sw_no_td');
                            document.querySelector('[data-active-store]').removeAttribute('data-active-store');
                        }
                        bulletNumber = 0;
                        carouselStories.slideTo(++idxActiveSlide);
                        storeSlider[idxActiveSlide].setAttribute('data-active-store', 'true');
                        storeSlider[idxActiveSlide].querySelector('.swiper-wrapper').classList.remove('sw_no_td');
                        initStore();
                    } else {
                        closeStoriesPopup();
                    }
                }
            }
            width++;
            activeBullet.style.width = width + '%';
        }, 47)
    }

    let activeStore;
    const initStore = () => {
        activeStore = new Swiper('[data-active-store]', {
            effect: "fade",
            speed: 800,
            modules: [Autoplay, Pagination],
            allowTouchMove: false,
            spaceBetween: 0,
            slidesPerView: 1,
            centeredSlides: true,
            clickable: false,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            on: {
                init: function (activeStore) {
                    bullets = activeStore.pagination.bullets;
                    clearInterval(interval);
                    if (bullets[0].classList.contains('swiper-pagination-bullet-active')) {
                        bullets[0].innerHTML = `<span class="active-bullet"></span>`;
                        const activeBullet = bullets[0].querySelector('.active-bullet');
                        startInterval(activeBullet, bullets);
                    }
                },

                slideChange: function (swiper) {
                    bullets = swiper.pagination.bullets;
                    clearInterval(interval);
                    bullets.forEach(item => {
                        if (item.classList.contains('swiper-pagination-bullet-active')) {
                            item.innerHTML = `<span class="active-bullet"></span>`;
                            const activeBullet = item.querySelector('.active-bullet');
                            startInterval(activeBullet, bullets);
                            bulletNumber++;
                        }
                    })

                    if (bulletNumber === bullets.length) {
                        if (storiesCards.length - 1 !== idxActiveSlide) {
                            clearInterval(interval);
                            activeStore.enabled = false;
                            if (document.querySelector('[data-active-store]')) {
                                const a = document.querySelector('[data-active-store] .swiper-wrapper');
                                a.classList.add('sw_no_td');
                                document.querySelector('[data-active-store]').removeAttribute('data-active-store');
                            }

                            bulletNumber = 0;
                            carouselStories.slideTo(++idxActiveSlide);
                            storeSlider[idxActiveSlide].setAttribute('data-active-store', 'true');
                            storeSlider[idxActiveSlide].querySelector('.swiper-wrapper').classList.remove('sw_no_td');
                            initStore();
                        } else {
                            closeStoriesPopup();
                        }
                    }
                }
            }
        });
    }

    const storiesCards = document.querySelectorAll('.stories-card');
    const storeSlider = document.querySelectorAll('.stories-carousel__images');
    const slides = document.querySelectorAll('.stories-carousel__story');
    let idxActiveSlide = 0;
    let bulletNumber = 0;
    let bullets = [];

    storiesCards.forEach((card, idx) => card.addEventListener('click', () => {
        showPopup(storiesPopup);
        carouselStories.slideTo(idx);
        idxActiveSlide = idx;
        storeSlider[idx].setAttribute('data-active-store', 'true');
        storeSlider[idx].querySelector('.swiper-wrapper').classList.remove('sw_no_td');
        initStore();
    }))

    slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
            clearInterval(interval);
            activeStore.enabled = false;
            activeStore.destroy(true, true);

            if (document.querySelector('[data-active-store]')) {
                const a = document.querySelector('[data-active-store] .swiper-wrapper');
                a.classList.add('sw_no_td');
                document.querySelector('[data-active-store]').removeAttribute('data-active-store');
            }

            bulletNumber = 0;
            carouselStories.slideTo(idx);
            storeSlider[idx].setAttribute('data-active-store', 'true');
            storeSlider[idx].querySelector('.swiper-wrapper').classList.remove('sw_no_td');
            idxActiveSlide = idx;
            initStore();
        });
    });
    // ========================================================================================================================================================================================================================================================
    // Функционал ========================================================================================================================================================================================================================================================
    // ========================================================================================================================================================================================================================================================
    function isWebp() {
        // Проверка поддержки webp
        function testWebP(callback) {
            let webP = new Image();
            webP.onload = webP.onerror = function () {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        // Добавление класса _webp или _no-webp для HTML
        testWebP(function (support) {
            let className = support === true ? 'webp' : 'no-webp';
            document.documentElement.classList.add(className);
        });
    }
    isWebp();


    /* Burger menu*/
    //============================================================================================================================================================================================================================================
    const mainTogglerMenu = document.querySelector('.icon-menu');
    const menuToggles = document.querySelectorAll('.icon-menu');

    const menu = document.querySelector('[data-nav-menu]');

    const overlay = document.querySelector('.overlay');


    const closeMenu = () => {
        menu.classList.remove('app__aside_active');
        menuToggles.forEach(menu => menu.classList.remove('icon-menu_active'));
        overlay.classList.remove('overlay_active');
        document.body.classList.remove('lock');
        document.body.removeEventListener('click', closeMenu);
    }

    const toggleMenu = (event) => {
        event.stopPropagation();
        const expanded = mainTogglerMenu.classList.contains('icon-menu_active');
        menuToggles.forEach(menu => menu.classList.toggle('icon-menu_active'));
        menu.classList.toggle('app__aside_active', !expanded);
        overlay.classList.toggle('overlay_active');
        document.body.classList.toggle('lock');
        if (!menu.classList.contains('app__aside_active')) {
            closeMenu();
        }
    };

    menuToggles.forEach(menu => menu.addEventListener('click', (event) => toggleMenu(event)));



    //Поделиться постом
    const shareButtons = document.querySelectorAll('[data-share-post]');
    let isOpenShareList = true;
    let activeShareList = null;

    const showShareList = (e) => {
        e.stopPropagation();
        const shareList = e.target.closest('.post-info__share').querySelector('.share-post');
        shareList.classList.add('share-post_active');
        activeShareList = shareList;
        isOpenShareList = true;

        if (window.innerWidth < 767.98) {
            overlay.classList.add('overlay_active');
            document.body.classList.add('lock');
        }
    }

    const hideShareList = () => {
        activeShareList.classList.remove('share-post_active');
        isOpenShareList = false;
        activeShareList = null;
        overlay.classList.remove('overlay_active');
        document.body.classList.remove('lock');
    }

    shareButtons.forEach(button => button.addEventListener('click', (event) => showShareList(event)));


    document.body.addEventListener('click', (event) => {
        if (menu.classList.contains('app__aside_active') && !menu.contains(event.target) && !mainTogglerMenu.contains(event.target)) {
            closeMenu();
        }

        if (isOpenShareList && activeShareList) {
            hideShareList();
        }

    });


    //Скрыть верхнюю панель с рекламой============================================================================================================================================================================================================================================
    const advTop = document.querySelector('[data-adv-top]');

    if (advTop) {
        const closeAdvTop = document.querySelector('[data-adv-close]');

        const hideAdvToppanel = () => {
            advTop.classList.remove('header__adv_active');
        }

        closeAdvTop.addEventListener('click', hideAdvToppanel);
    }

    //Показать/скрыть поисковую форму============================================================================================================================================================================================================================================
    const header = document.querySelector('.header')
    const searchForm = document.querySelector('[data-search-form]');
    const searchButton = document.querySelector('[data-search-button]');
    const look = document.querySelector('[data-look]');
    const choiceTheme = document.querySelector('[data-choice-theme]');

    const toggleSearchForm = () => {
        searchForm.classList.toggle('header__search_active');
        look.classList.toggle('header__look_hide');
        choiceTheme.classList.toggle('choice-theme_hide');
        if (window.innerWidth < 767.98) {
            choiceTheme.classList.remove('choice-theme_hide');
            header.classList.toggle('header_search_active')
        }
    }

    searchButton.addEventListener('click', toggleSearchForm);


    //Выбрать цветовую тему============================================================================================================================================================================================================================================
    const themeSwitcher = document.querySelector('#switch-theme');
    const body = document.querySelector('body');
    const buttonThemeLight = document.querySelector('[data-button-theme-light]');
    const buttonThemeDark = document.querySelector('[data-button-theme-dark]');

    const toggleDarkTheme = () => {
        if (themeSwitcher.checked) {
            body.setAttribute('data-theme', 'dark');
            buttonThemeLight.classList.remove('choice-theme__button_active');
            buttonThemeDark.classList.add('choice-theme__button_active');
        } else {
            body.setAttribute('data-theme', 'light');
            buttonThemeLight.classList.add('choice-theme__button_active');
            buttonThemeDark.classList.remove('choice-theme__button_active');
        }
    }

    buttonThemeLight.addEventListener('click', () => {
        themeSwitcher.checked = !themeSwitcher.checked;
        toggleDarkTheme(themeSwitcher.checked);
    });

    buttonThemeDark.addEventListener('click', () => {
        themeSwitcher.checked = !themeSwitcher.checked;
        toggleDarkTheme(themeSwitcher.checked);
    });


    themeSwitcher.addEventListener('input', () => toggleDarkTheme(themeSwitcher.checked));


    //Голосование ============================================================================================================================================================================================================================================
    const postSurvey = document.querySelector('[data-post-survey]')

    if (postSurvey) {
        const surveyInputs = postSurvey.querySelectorAll('input')
        let totalVotes = +document.querySelector('[data-post-survey]').getAttribute('data-total-votes');
        const vote = {
            wasVote: false,
            lastVote: null
        }

        const changeVote = (inputs) => {
            inputs.forEach(input => {
                const result = `${(+input.getAttribute('data-number-votes') * 100 / totalVotes).toFixed(1)}%`;
                const surveyBox = input.closest('.post-survey__row');
                const surveyResult = surveyBox.querySelector('.post-survey__result');
                const surveyProgress = surveyBox.querySelector('.post-survey__progress');
                surveyResult.innerHTML = result;
                surveyProgress.style.width = result;
                if (!(input === vote.lastVote)) {
                    surveyBox.classList.remove('post-survey__row_select');
                    surveyBox.classList.add('post-survey__row_active');
                } else {
                    surveyBox.classList.add('post-survey__row_active', 'post-survey__row_select');
                }
            })
        }

        const calcSurvey = (inputs) => {
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    if (vote.wasVote === false) {
                        postSurvey.setAttribute('data-total-votes', ++totalVotes);
                        input.setAttribute('data-number-votes', +input.getAttribute('data-number-votes') + 1);
                        vote.wasVote = true;
                        vote.lastVote = input;
                    } else {
                        vote.lastVote.setAttribute('data-number-votes', +vote.lastVote.getAttribute('data-number-votes') - 1);
                        input.setAttribute('data-number-votes', +input.getAttribute('data-number-votes') + 1);
                        vote.lastVote = input;
                    }
                    changeVote(inputs);
                })
            })
        }

        calcSurvey(surveyInputs);
    }

    // Видеоплеер
    const video = document.querySelector('[data-video-player]');
    const playButton = document.querySelector('[data-video-play]');

    if (video && playButton) {

        video.addEventListener('play', () => {
            playButton.style.display = 'none';
            video.setAttribute('controls', true)
        });

        video.addEventListener('pause', () => {
            playButton.style.display = 'block';
            video.removeAttribute('controls', true)
        });

        video.addEventListener('ended', () => {
            playButton.style.display = 'block';
        });

        playButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();

            } else {
                video.pause();
            }
        });

    }

    //--------------------------------
    const iconsPassword = document.querySelectorAll('.authorization__icon-password');

    const showHidePassword = (icon) => {
        const input = icon.closest('.authorization__label_password').querySelector('.input');
        input.getAttribute('type') === 'password' ? input.setAttribute('type', 'text') : input.setAttribute('type', 'password');

        icon.classList.toggle('authorization__icon-password_hide')
    }

    iconsPassword.forEach(icon => icon.addEventListener('click', () => showHidePassword(icon)));


    const authorization = document.querySelector('[data-popup-authorization]');
    const authorizationForms = authorization.querySelectorAll('.authorization')


    const registerFormButtons = authorization.querySelectorAll('[data-register-button]');
    const authorizationButtons = authorization.querySelectorAll('[data-authorization-button]');
    const recoveryButtons = authorization.querySelectorAll('[data-recovery-button]');


    authorizationButtons.forEach(button => {
        button.addEventListener('click', () => {
            authorizationForms.forEach(form => {
                if (!form.hasAttribute('data-authorization-form')) {
                    form.classList.remove('authorization_active')
                } else {
                    form.classList.add('authorization_active')
                }
            })
        })
    })

    registerFormButtons.forEach(button => {
        button.addEventListener('click', () => {
            authorizationForms.forEach(form => {
                if (!form.hasAttribute('data-register-form')) {
                    form.classList.remove('authorization_active')
                } else {
                    form.classList.add('authorization_active')
                }
            })
        })
    })

    recoveryButtons.forEach(button => {
        button.addEventListener('click', () => {
            authorizationForms.forEach(form => {
                if (!form.hasAttribute('data-recovery-form')) {
                    form.classList.remove('authorization_active')
                } else {
                    form.classList.add('authorization_active')
                }
            })
        })
    })

    //Возвращаем анимацию после загрузки DOM
    body.classList.remove('preload');


    //Read later
    const postponeButtons = document.querySelectorAll('[data-postponed]')

    if (postponeButtons.length) {
        const togglePostponed = (button) => {
            const postponeText = button.querySelector('span');
            const postponeIcon = button.querySelector('svg use');
            const iconPath = postponeIcon.getAttribute('xlink:href');
            const state = button.getAttribute('data-postponed');

            if (state === 'false') {
                postponeText.innerText = 'Отложено';
                button.setAttribute('data-postponed', 'true')
                postponeIcon.setAttribute('xlink:href', iconPath.slice(0, iconPath.indexOf('#')) + '#i-postponed')
            } else {
                postponeText.innerText = 'Читать позже';
                button.setAttribute('data-postponed', 'false')
                postponeIcon.setAttribute('xlink:href', iconPath.slice(0, iconPath.indexOf('#')) + '#i-flag')
            }
        }
        postponeButtons.forEach(button => button.addEventListener('click', () => togglePostponed(button)));
    }

    //ShareList
    const shareToggler = document.querySelector('[data-toggler-share]');
    const articles = document.querySelectorAll('[data-article]');

    if (shareToggler && articles.length) {
        const shareList = document.querySelector('[data-show-article]');
        let activeArticle = articles[0].getAttribute('data-article');
        shareList.setAttribute('data-show-article', activeArticle);

        const toggleShareList = () => {
            shareList.classList.toggle('share__list_show');
        }

        const getVisibleArticle = (article) => {
            const targetPosition = {
                top: window.pageYOffset + article.getBoundingClientRect().top,
                left: window.pageXOffset + article.getBoundingClientRect().left,
                right: window.pageXOffset + article.getBoundingClientRect().right,
                bottom: window.pageYOffset + article.getBoundingClientRect().bottom
            },
                windowPosition = {
                    top: window.pageYOffset,
                    left: window.pageXOffset,
                    right: window.pageXOffset + document.documentElement.clientWidth,
                    bottom: window.pageYOffset + document.documentElement.clientHeight
                };

            if (targetPosition.bottom > windowPosition.top &&
                targetPosition.top < windowPosition.bottom &&
                targetPosition.right > windowPosition.left &&
                targetPosition.left < windowPosition.right) {
                activeArticle = article.getAttribute('data-article');
                shareList.setAttribute('data-show-article', activeArticle);
            }
        };

        window.addEventListener('scroll', () => articles.forEach(elem => getVisibleArticle(elem)));
        shareToggler.addEventListener('click', toggleShareList);
    }

    //---------------------------------------------------
}, false);


var a = document.querySelector('.article-contents'), b = null, P = 0;

if (a) {
    window.addEventListener('scroll', Ascroll, false);
    document.body.addEventListener('scroll', Ascroll, false);
    function Ascroll() {
        if (b == null) {
            var Sa = getComputedStyle(a, ''), s = '';
            for (var i = 0; i < Sa.length; i++) {
                if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 ||
                    Sa[i].indexOf('background') == '0') {
                    s += Sa[i] + ': ' + Sa.getPropertyValue(Sa[i]) + '; '
                }
            }
            b = document.createElement('div');
            b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
            a.insertBefore(b, a.firstChild);
            var l = a.childNodes.length;
            for (var i = 1; i < l; i++) {
                b.appendChild(a.childNodes[1]);
            }
            a.style.height = b.getBoundingClientRect().height + 'px';
            a.style.padding = '0';
            a.style.border = '0';
        }
        var Ra = a.getBoundingClientRect(),
            R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.article-cards__main').getBoundingClientRect().bottom);  // селектор блока, при достижении нижнего края которого нужно открепить прилипающий элемент
        if ((Ra.top - P) <= 0) {
            if ((Ra.top - P) <= R) {
                b.className = 'stop';
                b.style.top = - R + 'px';
            } else {
                b.className = 'sticky';
                b.style.top = P + 'px';
            }
        } else {
            b.className = '';
            b.style.top = '';
        }
        window.addEventListener('resize', function () {
            a.children[0].style.width = getComputedStyle(a, '').width
        }, false);
    }
}








