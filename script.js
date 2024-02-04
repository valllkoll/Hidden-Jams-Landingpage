// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let fireLandscapeAnimation = function () {
    let video = document.querySelector("#landingpage-video");

    let videoDuration = video.duration;
    let timeToPlay = (videoDuration - 2.1) * 1000;
    console.log(timeToPlay);

    setTimeout(() => addAnimations(),
        timeToPlay);
}

function addAnimations() {
    let jamsText = document.querySelector("#jams-text");
    let hiddenText = document.querySelector("#hidden-text");
    let bottomImageCover = document.querySelector(".cover");
    let bottomImage = document.querySelector(".image");

    if (hiddenText) {
        addBlurAnimation(hiddenText);
    }

    if (hiddenText) {
        addHiddenSlideAnimation(hiddenText);
    }

    if (jamsText) {
        addJamsSlideAnimation(jamsText);
    }

    if (bottomImageCover && bottomImage) {
        setTimeout(() =>
                addBottomCoverAnimation(bottomImageCover, bottomImage),
            1500)
    }
}


function addBottomCoverAnimation(bottomImageCover, bottomImage) {
    bottomImageCover.style.zIndex = "5";
    bottomImageCover.style.animation = "coverSlide 1s forwards 1s";
    bottomImage.style.display = "block";

    let video = document.querySelector("#landingpage-video");

    if (video) {
        videoDuration = video.duration;
        video.style.display = "none";
    }
}


function addBlurAnimation(blurElements) {
    let params = LOGO_ANIMATION_PARAMETERS;
    let hiddenText = document.querySelector("#hidden-text");

    blurElements.style.animation =
        params.HIDDEN_CSS_ANIMATION_TAG + ' ' +
        params.HIDDEN_ANIMATION_LENGTH + ' ' +
        'forwards' + ' ' +
        params.HIDDEN_EASING_TYPE;

    setTimeout(() => {
        hiddenText.style.backgroundColor = "#f5f5f5";
        console.log("SET BACKGROUND");
    }, 1500);

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
}

function addHiddenSlideAnimation(hiddenText) {
    let params = LOGO_ANIMATION_PARAMETERS;

    hiddenText.style.animation += ', ' +
        params.HIDDEN_SLIDE_CSS_ANIMATION_TAG + ' ' +
        params.JAMS_ANIMATION_LENGTH + ' ' +
        'forwards' + ' ' +
        params.JAMS_EASING_TYPE + ' ' +
        params.JAMS_ANIMATION_DELAY;

    console.log(hiddenText.style.animation);
}

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('landingpage-video');

    setTimeout(() => fireLandscapeAnimation(), 1000);
});

let firePortraitAnimation = function () {
    let video = document.querySelector("#landingpage-video");

    let videoDuration = video.duration;
    let timeToPlay = (videoDuration - 2.1) * 1000;
    console.log(timeToPlay);

    setTimeout(() => addAnimations(),
        timeToPlay);
}


let LOGO_ANIMATION_PARAMETERS = {

    HIDDEN_CSS_ANIMATION_TAG: "fadeInBlur",
    HIDDEN_ANIMATION_LENGTH: "1.5s",
    HIDDEN_EASING_TYPE: "ease-in",

    JAMS_CSS_ANIMATION_TAG: "slideRight",
    JAMS_ANIMATION_DELAY: "1.7s",
    JAMS_ANIMATION_LENGTH: "1.7s",
    JAMS_EASING_TYPE: "ease-in-out",

    HIDDEN_SLIDE_CSS_ANIMATION_TAG: 'slideLeft'

};