import {LOGO_ANIMATION_PARAMETERS} from "./constants.js";
import {ORIENTATION} from "./constants.js";

// Initializes animation once document is loaded
document.addEventListener('DOMContentLoaded', initialiseAnimation);

function initialiseAnimation() {
    let orientation = getScreenOrientation();

    loadCorrectVideo(orientation);
    scheduleAnimation(orientation);
}

function getScreenOrientation() {
    return window.innerWidth > window.innerHeight ? ORIENTATION.LANDSCAPE : ORIENTATION.PORTRAIT;
}

function loadCorrectVideo(orientation) {
    const videoElement = document.getElementById('landingpage-video');
    const videoSourceElement = document.getElementById('landingpage-source');

    // Change source based on screen orientation
    if (orientation === ORIENTATION.LANDSCAPE) {
        videoSourceElement.src = 'media/landingpage-intro-2.mp4';
    } else {
        videoSourceElement.src = 'media/landingpage-intro-hochkant.mp4';
    }

    // Reload the video to apply the changes
    videoElement.load();
}

function scheduleAnimation(screenOrientation) {
    setTimeout(() => fireAnimation(screenOrientation), 1000);
}

let fireAnimation = function (orientation) {
    const videoElement = document.getElementById('landingpage-video');

    // Wait the duration of the video minus 1.7 seconds
    let timeToWait = (videoElement.duration - 1.7) * 1000;

    setTimeout(() => addAnimations(orientation),
        timeToWait);
}

function addAnimations(orientation) {
    let jamsText = document.querySelector("#jams-text");
    let hiddenText = document.querySelector("#hidden-text");
    let bottomImageCover = document.querySelector(".cover");
    let bottomImage = document.querySelector(".image-container");

    if (!jamsText || !hiddenText || !bottomImageCover || !bottomImage) {
        console.error("Error loading DOM elements...");
        return;
    }

    addBlurAnimation(hiddenText);
    addHiddenSlideAnimation(hiddenText, orientation);
    addJamsSlideAnimation(jamsText, orientation);
    scheduleBottomCoverAnimation(bottomImageCover, bottomImage);
}

function addHiddenSlideAnimation(hiddenText, orientation) {
    let params = LOGO_ANIMATION_PARAMETERS;
    let animationTag;

    if (orientation === ORIENTATION.LANDSCAPE) {
        animationTag = params.HIDDEN_LANDSCAPE_ANIMATION_TAG;
    } else {
        animationTag = params.HIDDEN_PORTRAIT_ANIMATION_TAG;
    }

    hiddenText.style.animation += ', ' +
        animationTag + ' ' +
        params.JAMS_ANIMATION_LENGTH + 's ' +
        'forwards' + ' ' +
        params.JAMS_EASING_TYPE + ' ' +
        params.JAMS_ANIMATION_DELAY + 's';
}

function addJamsSlideAnimation(jamsText, orientation) {
    let params = LOGO_ANIMATION_PARAMETERS;
    let animationTag;

    if (orientation === ORIENTATION.LANDSCAPE) {
        animationTag = params.JAMS_LANDSCAPE_ANIMATION_TAG;

    } else {
        animationTag = params.JAMS_PORTRAIT_ANIMATION_TAG;
    }

    jamsText.style.animation =
        animationTag + ' ' +
        params.JAMS_ANIMATION_LENGTH + 's ' +
        'forwards' + ' ' +
        params.JAMS_EASING_TYPE + ' ' +
        params.JAMS_ANIMATION_DELAY + 's';
}

function addBlurAnimation(blurElements) {
    let params = LOGO_ANIMATION_PARAMETERS;
    let hiddenText = document.querySelector("#hidden-text");

    blurElements.style.animation =
        params.BLUR_ANIMATION_TAG + ' ' +
        params.BLUR_ANIMATION_LENGTH + 's ' +
        'forwards' + ' ' +
        params.BLUR_EASING_TYPE;

    setTimeout(() => {
        hiddenText.style.backgroundColor = "#f5f5f5";
    }, 1500);
}

function scheduleBottomCoverAnimation(bottomImageCover, bottomImage) {
    setTimeout(() =>
            addBottomCoverAnimation(bottomImageCover, bottomImage),
        LOGO_ANIMATION_PARAMETERS.IMAGE_COVER_DELAY * 1000)
}

function addBottomCoverAnimation(bottomImageCover, bottomImage) {
    bottomImageCover.style.zIndex = "5";
    bottomImageCover.style.animation = "coverSlide 1s forwards 1s";
    bottomImage.style.display = "flex";
}

