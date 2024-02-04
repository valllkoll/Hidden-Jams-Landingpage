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
    const videoElement = document.getElementById('landingpage-video');

    let videoDuration = videoElement.duration;
    let timeToPlay = (videoDuration - 2.1) * 1000;
    console.log("LANDSCAPE");

    setTimeout(() => addAnimations(),
        timeToPlay);
}

function addAnimations() {
    let jamsText = document.querySelector("#jams-text");
    let hiddenText = document.querySelector("#hidden-text");
    let bottomImageCover = document.querySelector(".cover");
    let bottomImage = document.querySelector(".image-container");

    if (hiddenText) {
        addBlurAnimation(hiddenText);
    }

    if (hiddenText) {
        addHiddenSlideAnimation(hiddenText, MODE.LANDSCAPE);
    }

    if (jamsText) {
        addJamsSlideAnimation(jamsText, MODE.LANDSCAPE);
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
    }, 1500);
}

function addJamsSlideAnimation(jamsText, mode) {
    let params = LOGO_ANIMATION_PARAMETERS;
    let animationTag;

    if (mode === MODE.LANDSCAPE) {
        animationTag = params.JAMS_CSS_ANIMATION_TAG;

    } else {
        animationTag = "slideDown";
    }

    jamsText.style.animation =
        animationTag + ' ' +
        params.JAMS_ANIMATION_LENGTH + ' ' +
        'forwards' + ' ' +
        params.JAMS_EASING_TYPE + ' ' +
        params.JAMS_ANIMATION_DELAY;

}

const MODE = {
    PORTRAIT: "Portrait",
    LANDSCAPE: "Landscape"
}

function addHiddenSlideAnimation(hiddenText, mode) {
    let params = LOGO_ANIMATION_PARAMETERS;
    let animationTag;
    console.log("MODE is " + mode);

    if (mode === MODE.LANDSCAPE) {
        animationTag = params.HIDDEN_SLIDE_CSS_ANIMATION_TAG;
    } else {
        animationTag = "slideUp";
    }

    console.log(animationTag);

    hiddenText.style.animation += ', ' +
        animationTag + ' ' +
        params.JAMS_ANIMATION_LENGTH + ' ' +
        'forwards' + ' ' +
        params.JAMS_EASING_TYPE + ' ' +
        params.JAMS_ANIMATION_DELAY;

    console.log(hiddenText.style.animation);
}

document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('landingpage-video');
    const videoSourceElement = document.getElementById('landingpage-source');
    const landscapeMode = window.innerWidth > window.innerHeight;

    // Change source on a certain condition
    if (landscapeMode) {
        videoSourceElement.src = 'media/landingpage-intro-2.mp4';
    } else {
        videoSourceElement.src = 'media/landingpage-intro-hochkant.mp4';
    }

    // Reload the video to apply the changes
    videoElement.load();

    if (landscapeMode) {
        setTimeout(() => fireLandscapeAnimation(), 1000);
    } else {
        setTimeout(() => firePortraitAnimation(), 1000)
    }
});

function addPortraitAnimations() {
    let jamsText = document.querySelector("#jams-text");
    let hiddenText = document.querySelector("#hidden-text");
    let bottomImageCover = document.querySelector(".cover");
    let bottomImage = document.querySelector(".image");

    if (hiddenText) {
        addBlurAnimation(hiddenText, MODE.PORTRAIT);
    }

    if (hiddenText) {
        addHiddenSlideAnimation(hiddenText, MODE.PORTRAIT);
    }

    if (jamsText) {
        addJamsSlideAnimation(jamsText, MODE.PORTRAIT);
    }

    if (bottomImageCover && bottomImage) {
        setTimeout(() =>
                addBottomCoverAnimation(bottomImageCover, bottomImage, MODE.PORTRAIT),
            1500)
    }
}

let firePortraitAnimation = function () {
    let video = document.querySelector("#landingpage-video");

    let videoDuration = video.duration;
    let timeToPlay = (videoDuration - 2.1) * 1000;
    console.log(timeToPlay);

    setTimeout(() => addPortraitAnimations(),
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
    toggleVisibility('element2', 250);
    // toggleVisibility('element3', 200);
    // toggleVisibility('element4', 250);
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  document.addEventListener('DOMContentLoaded', handleScroll);