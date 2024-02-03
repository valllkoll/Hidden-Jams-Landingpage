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
    let video = document.querySelector("#landingpage-video");

    let videoDuration = video.duration;
    let timeToPlay = (videoDuration - 2.1) * 1000;
    console.log(timeToPlay);

    setTimeout(() => addAnimations(),
        timeToPlay);
}

function addAnimations() {
    let blurElements = document.querySelector(".blur");
    let jamsText = document.querySelector("#jams-text");
    let bottomImageCover = document.querySelector(".cover");
    let bottomImage = document.querySelector(".image");

    if (blurElements) {
        addBlurAnimation(blurElements);
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
    bottomImageCover.style.animation = "coverSlide 1s forwards .5s";
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

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('landingpage-video');

    // video.addEventListener('ended', () => {
    //     fireAnimation();
    // });

    setTimeout(() => fireAnimation(), 1000);
});


let LOGO_ANIMATION_PARAMETERS = {

    HIDDEN_CSS_ANIMATION_TAG: "fadeInBlur",
    HIDDEN_ANIMATION_LENGTH: "1.5s",
    HIDDEN_EASING_TYPE: "ease-in",

    JAMS_CSS_ANIMATION_TAG: "slideRight",
    JAMS_ANIMATION_DELAY: "1.7s",
    JAMS_ANIMATION_LENGTH: "1.7s",
    JAMS_EASING_TYPE: "ease-in-out",
};