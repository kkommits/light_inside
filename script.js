'use strict';

ImageMap('img[usemap]');

(() => {
    const youTubePromise = new Promise(resolve => {
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
        const scriptTag = document.createElement('script');
        scriptTag.src = 'https://www.youtube.com/iframe_api';

        document.body.appendChild(scriptTag);
    });

    const overlayElement = document.getElementById('overlay');
    const topLeftPostIt = document.getElementById('top-left-postit');
    const eggIslandArea = document.getElementById('egg-island-area');
    const eggIslandPostIt = document.getElementById('egg-island-postit');
    const hikarinNakaArea = document.getElementById('hikarin-naka-area');
    const hikarinNakaPost = document.getElementById('mapping-post');
    const krystalEggArea = document.getElementById('krystal-egg-area');
    const howToCrackArea = document.getElementById('how-to-crack-area');
    const howToCrackPostIt = document.getElementById('how-to-crack-postit');
    const exkursionPostIt = document.getElementById('exkursion-postit');

    topLeftPostIt.addEventListener('click', event => showOverlayAndPlayVideo(event, 'jKLzwUggKDI'))
    eggIslandArea.addEventListener('click', handleEggIslandClick);
    eggIslandPostIt.addEventListener('click', handleEggIslandClick);
    hikarinNakaPost.addEventListener('click', event => showOverlayAndPlayVideo(event, 'Y1430HQa2QM'));
    hikarinNakaArea.addEventListener('click', event => showOverlayAndPlayVideo(event, 'Y1430HQa2QM'));
    krystalEggArea.addEventListener('click', event => showOverlayAndPlayVideo(event, 'jKLzwUggKDI'));
    howToCrackArea.addEventListener('click', handleHowToCrackAreaClick);
    howToCrackPostIt.addEventListener('click', handleHowToCrackAreaClick);
    exkursionPostIt.addEventListener('click', event => showOverlayAndPlayVideo(event, 'B3pl9NG7IpQ'));

    function handleEggIslandClick(event) {
        showOverlayAndPlayVideo(event, 'hA3dkTOUz9A');
    }

    function handleHowToCrackAreaClick(event) {
        showOverlayAndPlayVideo(event, 'KlLLEyD5PxY');
    }

    function showOverlayAndPlayVideo(event, videoId) {
        event.preventDefault();

        overlayElement.style.display = 'block';

        youTubePromise.then(youTube => {
            new youTube.Player('player', {
                width: '100%',
                height: '100%',
                videoId: videoId,
                playerVars: {
                    modestbranding: 1,
                    controls: 0
                },
                events: {
                    onReady: event => {
                        event.target.playVideo();
                    },
                    onStateChange: event => {
                        if (event.data === youTube.PlayerState.PAUSED || event.data === youTube.PlayerState.ENDED) {
                            overlayElement.style.display = 'none';

                            event.target.stopVideo();
                            event.target.destroy();
                        }
                    }
                }
            });
        });
    }
})();
