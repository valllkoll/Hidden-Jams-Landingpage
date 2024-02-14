let lastMouseout = Date.now();

function getOtherTeasers(selectedTeaser, teasers) {
    let toReturn = [];

    teasers.forEach(teaser => {
        if (teaser !== selectedTeaser) {
            toReturn.push(teaser);
        }
    });

    return toReturn;
}

function teaserMouseout(modal) {
    return function (event) {
        const teaserItem = event.target.closest('.teaser-item');
        const teaserVid = event.target.closest('.teaser-vid');
        const teaserItems = document.querySelectorAll('.teaser-item');

        if (teaserItem && teaserVid) {
            // Handle mouseout on teaser video
            teaserItem.style.transform = 'scale(1)';
            teaserVid.playbackRate = 0.6;
            teaserItem.width = '30%';
            for (let i = 0; i < 3; i++) {
                if (teaserItem !== teaserItems[i]) {
                    teaserItems[i].style.animation = 'brightenVid 0.7s forwards';
                }
            }
            teaserItem.style.animation = 'blurVid 0.7s forwards';

            setTimeout(() => {

                for (let i = 0; i < 3; i++) {
                    teaserItems[i].style.zIndex = '6';
                }

                modal.style.zIndex = '5';
            }, 1000);
            modal.style.opacity = 0;

            // Preventing the event from bubbling up to the parent container
            event.stopPropagation();
            lastMouseout = Date.now();
        };
    }
}

function teaserMouseover(modal) {
    return function (event) {
        const teaserItem = event.target.closest('.teaser-item');
        const teaserVid = event.target.closest('.teaser-vid');

        if (teaserItem && teaserVid) {
            // Handle mouseover on teaser video
            // teaserItem.style.transform = 'scale(1.2)';
            teaserVid.playbackRate = 1;
            modal.style.opacity = '0.9';
            modal.style.zIndex = '9998';

            let teaserItems = document.querySelectorAll('.teaser-item');

            for (let i = 0; i < 3; i++) {
                teaserItems[i].style.zIndex = '9999';

                    if (teaserItem !== teaserItems[i]) {
                        if (Date.now() - lastMouseout > 500) {
                            teaserItems[i].style.animation = 'dimVid 0.7s forwards';
                        } else {
                            teaserItems[i].style.animation = '';
                            teaserItems[i].style.filter = 'blur(2px) brightness(0.3) contrast(80%)';
                        }
                    }
            }

            if (Date.now() - lastMouseout < 500) {
                console.log('darkvid')
                teaserItem.style.animation = 'sharpenDarkVideo 0.6s forwards';
            } else {
                console.log('lightvid');
                teaserItem.style.animation = 'sharpenBrightVideo 0.3s forwards';
            }
            teaserItem.style.filter = 'none';

            // Preventing the event from bubbling up to the parent container
            event.stopPropagation();
        }
    };
}

let slowDownTeaserVideos = function () {
    let teasers = [
        document.querySelector('#teaser1'),
        document.querySelector('#teaser2'),
        document.querySelector('#teaser3')
    ];
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
            // Get the video source
            // addStyle(replacementVideo, teaserVid, teaserItem);

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
    const steps = duration / intervalTime;
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
    console.log("Fading in!");
    const intervalTime = duration * 100; // Interval time in milliseconds
    const steps = duration / intervalTime;
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

function makeTeaserVidBig(teaserVid, teaserItem) {
    let teaserItems = document.querySelectorAll('.teaser-item');

    for (let i = 0; i < 3; i++) {

        if (teaserItem !== teaserItems[i]) {
            setTimeout(() => {
                teaserItems[i].style.opacity = '0';
                teaserItems[i].style.zIndex = '5';
            }, 500);
        }
    }

    const teaserContainer = document.querySelector('.teaser-container')
    const teaserRect = teaserItem.getBoundingClientRect();

    // Calculate the new width and height
    const oldWidth = teaserRect.width;
    const oldHeight = teaserRect.height;

// Calculate the adjustment in top and left
    let topAdjustment = (oldHeight - teaserRect.height) / 2;
    let leftAdjustment = (oldWidth - teaserRect.width) / 2;

// Adjust the teaserTop and teaserLeft values
    const teaserTop = teaserRect.top - topAdjustment;
    const teaserLeft = teaserRect.left - leftAdjustment;

    // Get dimensions of the teaser item
    const teaserWidth = teaserItem.offsetWidth;
    const teaserHeight = teaserItem.offsetHeight;

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
    muteUnmute(teaserItem, 3);

    teaserItem.classList.remove('teaser-item');

    teaserItem.style.animation = 'replacementAnimation 2s forwards';

    const dummyDiv = document.createElement('div');
    dummyDiv.classList.add('teaser-item');
    dummyDiv.classList.add('dummy-div');

    dummyDiv.style.width = teaserItem.width;

    teaserContainer.replaceChild(dummyDiv, teaserItem);

    const modal = document.querySelector('.modal');
    modal.style.zIndex = '9998';
    modal.style.opacity = '1';

    document.body.appendChild(teaserItem);

    teaserItem.addEventListener('click', () => muteUnmute(teaserItem, 0.5));
    modal.addEventListener('click', createClickListener(teaserItem));
}

const createClickListener = (teaserItem) => {
    // This is the actual click listener function
    const clickListener = () => {
        // Your code to handle the click event goes here
        makeTeaserVidInvisible(teaserItem);

        const modal = document.querySelector('.modal');
        modal.removeEventListener('click', clickListener);
    };

    // Return the listener function
    return clickListener;
};

let makeTeaserVidInvisible = function (teaserItem) {
    let teaserItems = document.querySelectorAll('.teaser-item');

    for (let i = 0; i < 3; i++) {

        if (teaserItem !== teaserItems[i]) {
            setTimeout(() => {
                teaserItems[i].style.opacity = '1';
            }, 500);
        }
    }

    const firstTeaserItem = document.querySelector('.teaser-item');
    const dummyDiv = document.querySelector('.dummy-div')

    const newWidth = firstTeaserItem.offsetWidth;
    const newHeight = firstTeaserItem.offsetHeight;

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
                        width: ${newWidth}px;
                        height: ${newHeight}px;
                        filter: blur(2px) brightness(90%) contrast(80%);
                    }
                }
            `, 0);

    teaserItem.style.animation = 'videoTransition 2s forwards';

    let teaserVid = teaserItem.querySelector('.teaser-vid');
    if (parseFloat(teaserVid.volume) !== 0) {
        muteUnmute(teaserItem, 3);
    } else {
        teaserVid.muted = true;
    }

    setTimeout(() => {
        dummyDiv.appendChild(teaserVid);
        document.body.removeChild(teaserItem);
        dummyDiv.classList.remove('dummy-div');
        modal.style.zIndex = '5';
    }, 2000);

    const modal = document.querySelector('.modal');
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 2s ease';
};

// Teaser videos are slowed by default
document.addEventListener('DOMContentLoaded', slowDownTeaserVideos);
