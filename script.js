// TODO - Get session cookie and don't play the video if they've visited recently

import {LOGO_ANIMATION_PARAMETERS} from "./constants.js";
import {ORIENTATION} from "./constants.js";

// Initializes animation once document is loaded
document.addEventListener('DOMContentLoaded', initialiseAnimation);

if (isAtTop()) {
    document.querySelector('body').style.overflow = "hidden";
}

function isAtTop() {
    return window.scrollY === 0;
}


// TODO - sync this with slide across animation
//Initializes Scroll Handler
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);

function hideVideo() {
    document.getElementById('landingpage-video').style.display = "none";
}

function hideAnimatedElements(orientation) {
    let hiddenText = document.querySelector('#hidden-text');
    let jamsText = document.querySelector('#jams-text');
    let imageContainer = document.querySelector('.image-container');
    let navBar = document.querySelector('.navbar');

    hiddenText.style.color = 'transparent';
    jamsText.style.color = 'transparent';

    if (orientation === ORIENTATION.LANDSCAPE) {
        jamsText.style.transform = 'translateX(-40%)';
        hiddenText.style.transform = 'translateX(45%)';
    } else {
        jamsText.style.transform = 'translateY(-60%)';
        hiddenText.style.transform = 'translateY(33%)';
    }
    imageContainer.style.display = 'none';

    navBar.style.opacity = '0';
}

function initialiseAnimation() {
    let orientation = getScreenOrientation();

    if (isAtTop()) {
        hideAnimatedElements(orientation);
        loadCorrectVideo(orientation);
        scheduleAnimation(orientation, 1000);
    } else {
        hideVideo();
    }
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

    videoElement.style.display = 'block';

    // Reload the video to apply the changes
    videoElement.load();

    videoElement.addEventListener('ended', () => {
        videoElement.style.display = 'none';
        console.log("HIDING THIS: ");
        console.log(videoElement);
    })
}

function scheduleAnimation(screenOrientation, timeToWait) {
    setTimeout(() => fireAnimation(screenOrientation), timeToWait);
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
    scheduleNavbarAppearance();
    scheduleScrollingEnable();
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

function scheduleNavbarAppearance() {
    setTimeout(() =>
            makeNavbarVisible(),
        LOGO_ANIMATION_PARAMETERS.NAVBAR_DELAY * 1000)
}

function scheduleScrollingEnable() {
    const body = document.querySelector("body");
    let scrollEnableDelay = (LOGO_ANIMATION_PARAMETERS.JAMS_ANIMATION_LENGTH +
        LOGO_ANIMATION_PARAMETERS.JAMS_ANIMATION_DELAY) * 1000;

    setTimeout(() => body.style.overflow = "auto",
        scrollEnableDelay);

}

function makeNavbarVisible() {
    let navbar = document.querySelector('.navbar');

    navbar.style.display = 'flex';
    navbar.style.animation = 'fadeIn 2s forwards';
}

function addBottomCoverAnimation(bottomImageCover, bottomImage) {
    bottomImageCover.style.zIndex = "5";
    bottomImageCover.style.animation = "coverSlide 1s forwards 1s";
    bottomImage.style.display = "flex";
    console.log("HELLO!")
}


// SCROLL REVEAL

function toggleVisibility(elementId, threshold) {
    var element = document.getElementById(elementId);
    var rect = element.getBoundingClientRect();

    if (rect.top < window.innerHeight - threshold) {
        element.classList.add('visible-element');
        element.classList.remove('hidden-element');
    }
}

function handleScroll() {
    toggleVisibility('element1', 200);
    setTimeout(() => toggleVisibility('element2', 100), 500);

    // toggleVisibility('element3', 200);
    // toggleVisibility('element4', 250);
}


