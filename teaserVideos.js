function getOtherTeasers(selectedTeaser, teasers) {
    let toReturn = [];

    teasers.forEach(teaser => {
        if (teaser !== selectedTeaser) {
            toReturn.push(teaser);
        }
    });

    return toReturn;
}

let slowDownTeaserVideos = function () {
    let teasers = [
        document.querySelector('#teaser1'),
        document.querySelector('#teaser2'),
        document.querySelector('#teaser3')
    ];
    const modal = document.querySelector('.modal');

    document.querySelector('.teaser-container').addEventListener('mouseover', function (event) {
        const teaserItem = event.target.closest('.teaser-item');
        const teaserVid = event.target.closest('.teaser-vid');

        if (teaserItem && teaserVid) {
            // Handle mouseover on teaser video
            teaserItem.style.transform = 'scale(1.2)';
            teaserVid.playbackRate = 1;
            teaserItem.style.filter = 'none';
            modal.style.opacity = 0.75;

            // Preventing the event from bubbling up to the parent container
            event.stopPropagation();
        }
    });

    document.querySelector('.teaser-container').addEventListener('mouseout', function (event) {
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
    });

    document.querySelector('.teaser-container').addEventListener('click', function (event) {
        const teaserItem = event.target.closest('.teaser-item');
        const teaserVid = event.target.closest('.teaser-vid');

        if (teaserItem && teaserVid) {
            let modalContainer = document.querySelector('.modal-video-container');

            modalContainer.style.display = 'flex';
            teaserItem.style.opacity = 0;
        }
    });
};



// Teaser videos are slowed by default
document.addEventListener('DOMContentLoaded', slowDownTeaserVideos);
