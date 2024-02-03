// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let fireAnimation = function () {
    let blurElements = document.querySelector(".blur");
    let jamsText = document.querySelector("#jams-text");

    if (blurElements) {
        addBlurAnimation(blurElements);
    } else {
        console.error("Element with class 'blur' not found.");
    }

    if (jamsText) {
        addJamsSlideAnimation(jamsText);
    } else {
        console.error("Element with id 'jams-text' not found.");
    }
}

let LOGO_ANIMATION_PARAMETERS = {

    HIDDEN_CSS_ANIMATION_TAG: "fadeInBlur",
    HIDDEN_ANIMATION_LENGTH: "1.5s",
    HIDDEN_EASING_TYPE: "ease-in",

    JAMS_CSS_ANIMATION_TAG: "slideRight",
    JAMS_ANIMATION_DELAY: "1.3s",
    JAMS_ANIMATION_LENGTH: "2.2s",
    JAMS_EASING_TYPE: "ease-in-out",
};


function addBlurAnimation(blurElements) {
    let params = LOGO_ANIMATION_PARAMETERS;

    blurElements.style.animation =
        params.HIDDEN_CSS_ANIMATION_TAG + ' ' +
        params.HIDDEN_ANIMATION_LENGTH + ' ' +
        'forwards' + ' ' +
        params.HIDDEN_EASING_TYPE;

    console.log("HIDDEN ANIM" + blurElements.style.animation);
}

function addJamsSlideAnimation(jamsText) {
    let params = LOGO_ANIMATION_PARAMETERS;

    jamsText.style.animation =
        params.JAMS_CSS_ANIMATION_TAG + ' ' +
        params.JAMS_ANIMATION_LENGTH + ' ' +
        'forwards' + ' ' +
        params.JAMS_EASING_TYPE + ' ' +
        params.JAMS_ANIMATION_DELAY;

    console.log("JAMS ANIM" + jamsText.style.animation);
}


