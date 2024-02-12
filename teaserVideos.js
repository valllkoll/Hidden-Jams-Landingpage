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
        if (teaserItem && teaserVid) {
            // Handle mouseout on teaser video
            teaserItem.style.transform = 'scale(1)';
            teaserVid.playbackRate = 0.6;
            teaserItem.width = '30%';
            teaserItem.style.filter = 'blur(2px) brightness(90%) contrast(80%)';
            modal.style.opacity = 0;

            // Preventing the event from bubbling up to the parent container
            event.stopPropagation();
        }
    };
}

function teaserMouseover(modal) {
    return function (event) {
        const teaserItem = event.target.closest('.teaser-item');
        const teaserVid = event.target.closest('.teaser-vid');

        if (teaserItem && teaserVid) {
            // Handle mouseover on teaser video
            teaserItem.style.transform = 'scale(1.2)';
            teaserVid.playbackRate = 1;
            teaserItem.style.filter = 'none';
            modal.style.opacity = '0.75';

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
            let teaserSrc = teaserVid.querySelector('source');

            // Create a new video element to replace the clicked video
            const replacementVideo = document.createElement('video');
            replacementVideo.setAttribute('id', 'replacement-video');
            replacementVideo.setAttribute('id', 'replacement-video');
            replacementVideo.setAttribute('preload', 'auto');
            replacementVideo.setAttribute('autoplay', 'true');
            replacementVideo.setAttribute('loop', 'true');
            replacementVideo.setAttribute('muted', 'true');

            // Create a new source element for the replacement video
            const replacementSource = document.createElement('source');
            replacementSource.setAttribute('src', teaserSrc.src);
            replacementSource.setAttribute('type', 'video/mp4');

            // Append the source element to the replacement video
            replacementVideo.appendChild(replacementSource);

            addStyle(replacementVideo, teaserVid, teaserItem);

            teaserVid.style.opacity = '0';

        }
    });
}

let addStyle = function (replacementVideo, teaserVid, teaserItem) {
    let modalContainer = document.querySelector('.modal-video-container');
    modalContainer.style.display = 'flex';

    const modal = document.querySelector('.modal');

    const teaserRect = teaserItem.getBoundingClientRect();
    const teaserTop = teaserRect.top + window.scrollY;
    const teaserLeft = teaserRect.left + window.scrollX;

    // Get dimensions of the teaser item
    const teaserWidth = teaserItem.offsetWidth;
    const teaserHeight = teaserItem.offsetHeight;

    // Create a div to contain the replacement video
    const replacementContainer = document.createElement('div');
    replacementContainer.style.width = teaserWidth * 1.2 + 'px';
    replacementContainer.style.height = teaserHeight * 1.2 + 'px';
    replacementContainer.style.position = 'absolute'; // Set to 'fixed' to position relative to the viewport
    replacementContainer.style.top = teaserTop + 'px';
    replacementContainer.style.left = teaserLeft + 'px';
    replacementContainer.style.overflow = 'hidden'; // Ensure the video is contained within the div


    // Set dimensions of the replacement video
    replacementVideo.style.objectFit = 'cover';
    replacementVideo.style.height = '100%';
    replacementVideo.volume = '1';

    // Append the replacement video to the video container
    replacementContainer.appendChild(replacementVideo);

    // Add any additional styles as needed
    replacementVideo.style.position = 'absolute';
    replacementVideo.style.zIndex = '9999';
    replacementContainer.style.animation = 'replacementAnimation 2s forwards';


    // Todo - Modal changes back into its mouseout state here! Maybe make the replacement container take up the whole screen so nothing else is clickable?
    modal.style.backgroundColor = 'red';

    // Append the video container to the teaser item

    document.body.appendChild(replacementContainer);
};

// Teaser videos are slowed by default
    document.addEventListener('DOMContentLoaded', slowDownTeaserVideos);
