let lastMouseout = Date.now();
let animating = false;

function teaserMouseout() {
    return function (event) {
        const teaserItem = event.target.closest('.teaser-item');
        const teaserVid = event.target.closest('.teaser-vid');
        const teaserItems = document.querySelectorAll('.teaser-item');

        if (teaserItem && teaserVid) {
            teaserItem.width = '30%';
            for (let i = 0; i < 3; i++) {
                if (teaserItem !== teaserItems[i]) {
                    teaserItems[i].style.animation = 'brightenVid 0.7s forwards';
                }
            }
            teaserItem.style.animation = 'blurVid 0.7s forwards';

            // Preventing the event from bubbling up to the parent container
            event.stopPropagation();
            lastMouseout = Date.now();
        }

        handleMouseMove(event);
    }
}

function handleMouseLeave() {
    if (!animating) {
        fadeOutModal(document.querySelectorAll('.teaser-item'));
    }
}

function handleMouseScroll() {

    // optional functionality for scrolling to brighten screen

    // if (!animating) {
    //     fadeOutModal(document.querySelectorAll('.teaser-item'));
    // }
}


function fadeOutModal(teaserItems) {
    const modal = document.querySelector('.modal');

    setTimeout(() => {
        if (!animating) {
        for (let i = 0; i < 3; i++) {
            teaserItems[i].style.zIndex = '6';
        }
        modal.style.zIndex = '5';
        }
    }, 1000);
    modal.style.opacity = '0';

    // TODO - ask Valentin
    // navBar.style.opacity = '1';
    document.body.removeEventListener('mousemove', handleMouseMove);
}

function handleMouseMove(event) {
    const teaserItems = document.querySelectorAll('.teaser-item');
    const mouseY = event.clientY;
    const mouseX = event.clientX;

    const containerRectTop = teaserItems[0].getBoundingClientRect();
    const containerRectBottom = teaserItems[2].getBoundingClientRect();
    const containerTop = containerRectTop.top;
    const containerBottom = containerRectBottom.bottom;

    const docWidth = document.documentElement.clientWidth;

    if (mouseY < containerTop || mouseY > containerBottom || mouseX < 0 || mouseX > docWidth ) {
        fadeOutModal(teaserItems);
    }
}

function teaserMouseover(modal) {
    return function (event) {
        const teaserItem = event.target.closest('.teaser-item');
        const teaserVid = event.target.closest('.teaser-vid');


        if (teaserItem && teaserVid) {
            // Handle mouseover on teaser video
            modal.style.opacity = '0.9';
            modal.style.zIndex = '9998';
            modal.style.transition = 'opacity 0.9s ease';

            let teaserItems = document.querySelectorAll('.teaser-item');
            const teaserTitles = document.querySelectorAll('.teaser-title');

            for (let i = 0; i < 3; i++) {
                teaserItems[i].style.zIndex = '9999';

                if (teaserItem !== teaserItems[i]) {
                    if (Date.now() - lastMouseout > 500) {
                        teaserItems[i].style.animation = 'dimVid 0.7s forwards';
                    } else {
                        teaserItems[i].style.animation = '';
                        teaserItems[i].style.animation = 'dimDarkVid 0.7s forwards';
                    }
                    teaserTitles[i].style.filter = 'blur(2px)';
                } else {
                    teaserTitles[i].style.filter = 'none';
                }
            }
            if (Date.now() - lastMouseout < 300) {
                teaserItem.style.animation = 'sharpenDarkVideo 0.6s forwards';
            } else {
                teaserItem.style.animation = 'sharpenBrightVideo 0.3s forwards';
            }
            teaserItem.style.filter = 'none';

            // Preventing the event from bubbling up to the parent container
            event.stopPropagation();
            document.body.addEventListener('mousemove', handleMouseMove);
        }
    };
}

let slowDownTeaserVideos = function () {
    const modal = document.querySelector('.modal');

    document.querySelector('.teaser-container').addEventListener('mouseover', teaserMouseover(modal));

    document.querySelector('.teaser-container').addEventListener('mouseout', teaserMouseout(modal));

    document.querySelector('.teaser-container').addEventListener('click', function (event) {
        const teaserItem = event.target.closest('.teaser-item');
        const teaserVid = event.target.closest('.teaser-vid');
        const teaserContainer = document.querySelector('.teaser-container')

        teaserContainer.removeEventListener('mouseout', teaserMouseout)
        teaserContainer.removeEventListener('mouseout', teaserMouseover)

        if (teaserItem && teaserVid) {
            makeTeaserVidBig(teaserVid, teaserItem);
        }
    });
}

function muteUnmute(teaserItem, seconds) {
    let teaserVid = teaserItem.querySelector('.teaser-vid');

    // if (teaserVid.muted) {
    //     teaserVid.muted = false;
    // } else {
    //     teaserVid.muted = true;
    // }

    if (teaserVid.volume !== 0) {
        fadeOutAudio(teaserVid, seconds);
    } else {
        fadeInAudio(teaserVid, seconds);
    }
}

function fadeOutAudio(teaserVideo, duration) {
    const startVolume = teaserVideo.volume;
    console.log(startVolume);
    const intervalTime = duration * 100;
    const volumeStep = 0.1;

    let currentStep = 0;

    const fadeInterval = setInterval(() => {
        if (teaserVideo.volume - volumeStep > 0) {
            teaserVideo.volume = teaserVideo.volume - volumeStep;
            currentStep++;
        } else {
            // Clear the interval when the fade-out is complete
            clearInterval(fadeInterval);
            teaserVideo.volume = 0; // Ensure the volume is set to 0 at the end
        }
    }, intervalTime);
}

function fadeInAudio(teaserVideo, duration) {
    const intervalTime = duration * 100; // Interval time in milliseconds
    const volumeStep = 0.1;

    let currentStep = 0;

    const fadeInterval = setInterval(() => {
        if (teaserVideo.volume + volumeStep < 1) {
            teaserVideo.volume = teaserVideo.volume + volumeStep;
            currentStep++;
        } else {
            // Clear the interval when the fade-in is complete
            clearInterval(fadeInterval);
            teaserVideo.volume = 1; // Ensure the volume is set to 1 at the end
        }
    }, intervalTime);
}

function enableDummyModal() {
    document.getElementById('dummyModal').style.display = 'block';
}

function getRectWithoutPadding(element) {
    const computedStyle = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    const paddingTop = parseFloat(computedStyle.paddingTop);
    const paddingRight = parseFloat(computedStyle.paddingRight);
    const paddingBottom = parseFloat(computedStyle.paddingBottom);
    const paddingLeft = parseFloat(computedStyle.paddingLeft);

    return {
        top: rect.top + paddingTop,
        right: rect.right - paddingRight,
        bottom: rect.bottom - paddingBottom,
        left: rect.left + paddingLeft,
        width: rect.width - (paddingLeft + paddingRight),
        height: rect.height - (paddingTop + paddingBottom),
    };
}


function disableDummyModal() {
    document.getElementById('dummyModal').style.display = 'none';
}

function makeTeaserVidBig(teaserVid, teaserItem) {
    animating = true;
    let teaserItems = document.querySelectorAll('.teaser-item');
    let teaserTitles = document.querySelectorAll('.teaser-title');
    const navBar = document.querySelector('.navbar');

    document.body.removeEventListener('mousemove', handleMouseMove);
    document.body.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('scroll', handleMouseScroll);
    document.body.style.overflow = 'hidden';

    enableDummyModal();

    setTimeout(() => disableDummyModal(), 1500)
    setTimeout(() => document.body.addEventListener('click', createClickListener(teaserItem)), 1500);

    console.log(navBar)
    navBar.style.opacity = '0';

    for (let i = 0; i < 3; i++) {

        if (teaserItem !== teaserItems[i]) {
            teaserItems[i].style.opacity = '0';

            setTimeout(() => {
                teaserItems[i].style.zIndex = '5';
            }, 500);
        }
    }

    teaserTitles.forEach(tt => tt.style.opacity = '0');

    const teaserContainer = document.querySelector('.teaser-container')
    const teaserRect = getRectWithoutPadding(teaserItem);

    // Adjust the teaserTop and teaserLeft values
    const teaserTop = teaserRect.top;
    const teaserLeft = teaserRect.left;

    // Get dimensions of the teaser item
    const teaserWidth = teaserRect.width;
    const teaserHeight = teaserRect.height;

    teaserItem.style.width = teaserWidth + 'px';
    teaserItem.style.height = teaserHeight + 'px';
    teaserItem.style.position = 'fixed';
    teaserItem.style.top = teaserTop + 'px';
    teaserItem.style.left = teaserLeft + 'px';
    teaserItem.style.overflow = 'hidden'; // Ensure the video is contained within the div
    teaserItem.style.zIndex = '99999';
    teaserItem.style.opacity = '1';
    teaserItem.style.overflow = 'visible';

    // Set dimensions of the replacement video
    teaserVid.style.objectFit = 'cover';
    teaserVid.style.height = '100%';
    teaserVid.style.zIndex = '99999';
    teaserVid.style.opacity = '1';
    teaserVid.volume = '0';
    teaserVid.muted = false;
    muteUnmute(teaserItem, 1);

    teaserItem.classList.remove('teaser-item');

    teaserItem.style.animation = 'replacementAnimation 2s forwards';

    const dummyDiv = document.createElement('div');
    dummyDiv.classList.add('teaser-item');
    dummyDiv.classList.add('dummy-div');

    dummyDiv.style.width = teaserItem.width;

    // TODO - figure out this inheritance problem
    let teaserItemContainer = teaserItem.parentElement;
    teaserItemContainer.replaceChild(dummyDiv, teaserItem);

    const modal = document.querySelector('.modal');
    modal.style.opacity = '1';

    setTimeout(() => modal.style.zIndex = '10', 1000)
    setTimeout(() => animating = false, 1000)

    document.body.appendChild(teaserItem);
}

const createClickListener = (teaserItem) => {
    // This is the actual click listener function
    const clickListener = () => {
        // Your code to handle the click event goes here
        makeTeaserVidInvisible(teaserItem);

        document.body.removeEventListener('click', clickListener);
    };

    // Return the listener function
    return clickListener;
};

let makeTeaserVidInvisible = function (teaserItem) {
    let teaserItems = document.querySelectorAll('.teaser-item');
    let teaserTitles = document.querySelectorAll('.teaser-title');
    const modal = document.querySelector('.modal');
    const navBar = document.querySelector('.navbar');

    modal.style.transition = 'opacity 2s ease';

    setTimeout(() => document.body.addEventListener('mouseleave', handleMouseLeave), 2000);
    setTimeout(() => window.addEventListener('scroll', handleMouseScroll), 3000);

    for (let i = 0; i < 3; i++) {

        if (teaserItem !== teaserItems[i]) {
            setTimeout(() => {
                teaserItems[i].style.opacity = '1';
            }, 500);
        }
    }

    let firstTeaserItem = teaserItems[0];

    if (firstTeaserItem.classList.contains('dummy-div')) {
        firstTeaserItem = teaserItems[1];
    }
    const dummyDiv = document.querySelector('.dummy-div')

    const rect = getRectWithoutPadding(firstTeaserItem);

    console.log("Height: " + rect.height);

    // Set the keyframes dynamically based on the dummyDiv's position and size
    document.styleSheets[0].insertRule(`
                @keyframes videoTransition {
                    from {
                            width: 70%;
                            left: 15%;
                            top: 15%;
                            bottom: 10%;
                            right: auto;
                            height: 70vh;
                    }
                    to {
                        width: ${rect.width}px;
                        height: ${rect.height}px;
                        filter: blur(2px) brightness(90%) contrast(80%);
                    }
                }
            `, 0);

    teaserItem.style.animation = 'videoTransition 2s forwards';
    navBar.style.opacity = '1';

    let teaserVid = teaserItem.querySelector('.teaser-vid');
    if (parseFloat(teaserVid.volume) !== 0) {
        muteUnmute(teaserItem, 2);
    }
    setTimeout(() => {
        teaserVid.muted = true;
    }, 2000);

    setTimeout(() => {
        dummyDiv.appendChild(teaserVid);
        document.body.removeChild(teaserItem);
        dummyDiv.classList.remove('dummy-div');
        dummyDiv.style = '';
        modal.style.zIndex = '5';
        document.body.style.overflow = '';
        teaserTitles.forEach(tt => tt.style.opacity = '1');
    }, 2000);

    modal.style.opacity = '0';
};

// Teaser videos are slowed by default
document.addEventListener('DOMContentLoaded', slowDownTeaserVideos);
document.body.addEventListener('mouseleave', handleMouseLeave);

window.addEventListener('scroll', handleMouseScroll);
