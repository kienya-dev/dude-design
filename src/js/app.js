// Подключение основного файла стилей
import "../scss/style.scss";

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

import "./files/sliders.js";

 /* Burger menu*/
    //============================================================================================================================================================================================================================================
    const menuToggle = document.querySelector('.icon-menu');
    const menu = document.querySelector('[data-nav-menu]');

    const overlay = document.querySelector('.overlay');


    const closeMenu = () => {
        menu.classList.remove('app__aside_active');
        menuToggle.classList.remove('icon-menu_active');
        overlay.classList.remove('overlay_active');
        document.body.classList.remove('lock');
        document.body.removeEventListener('click', closeMenu);
    }

    const toggleMenu = (event) => {
        event.stopPropagation();
        const expanded = menuToggle.classList.contains('icon-menu_active');
        menuToggle.classList.toggle('icon-menu_active');
        menu.classList.toggle('app__aside_active', !expanded);
        overlay.classList.toggle('overlay_active');
        document.body.classList.toggle('lock');
        if (!menu.classList.contains('app__aside_active')) {
            closeMenu();
        }
    };

    menuToggle.addEventListener('click', (event) => toggleMenu(event));

    document.body.addEventListener('click', (event) => {
        if (menu.classList.contains('app__aside_active') && !menu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
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
const searchForm = document.querySelector('[data-search-form]');
const searchButton = document.querySelector('[data-search-button]');
const look = document.querySelector('[data-look]');
const choiceTheme = document.querySelector('[data-choice-theme]');

const toggleSearchForm = () => {
    searchForm.classList.toggle('header__search_active');
    look.classList.toggle('header__look_hide');
    choiceTheme.classList.toggle('choice-theme_hide');
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
        if(!(input === vote.lastVote)) {
            surveyBox.classList.remove('post-survey__row_select');
            surveyBox.classList.add('post-survey__row_active');   
        } else {
            surveyBox.classList.add('post-survey__row_active', 'post-survey__row_select');        
        }          
    })
}

const calcSurvey= (inputs) => {
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


//------------Наброски видеоплеера
const video = document.querySelector('[data-video-player]');
const playButton = document.querySelector('[data-video-play]');


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