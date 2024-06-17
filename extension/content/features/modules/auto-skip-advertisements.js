import { isVideoOpened } from '../common';

/**
 * This mutation observer is used to watch for changes in the advertisements
 * container and skip the ads when they appear.
 *
 * @type {MutationObserver}
 */
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.childNodes.length > 0) {
      skipAdvertisement();
    }
  });
});

/**
 * Automatically skips ads on the current video. Uses a mutation observer to
 * watch for changes in the advertisements container.
 *
 * @returns {Object} The status of the function and the parameters.
 */
export function autoSkipAdvertisements() {
  if (!isVideoOpened()) {
    return { status: 'success', params: {} };
  }

  const adsInfoContainer = document.querySelector('.video-ads');

  if (!adsInfoContainer) {
    return { status: 'fail', params: {} };
  }

  const isAdPlaying = adsInfoContainer.childNodes.length > 0;

  if (isAdPlaying) {
    skipAdvertisement();
  }

  cleanUp();
  observer.observe(adsInfoContainer, { childList: true });
  return { status: 'success', params: {} };
}

/**
 * Disconnects the mutation observer used to watch for advertisements. Does not
 * disconnect the observer if a video is currently opened.
 */
export function cleanUp() {
  if (isVideoOpened()) {
    return;
  }

  observer.disconnect();
}

/**
 * Skips an advertisement on the current video. It uses one of the following
 * methods:
 * - Clicks the skip button if it exists (even if it's not visible)
 * - Sets the video's current time to the maximum value if the skip button
 *   doesn't exist
 */
function skipAdvertisement() {
  const skipButton = document.querySelector('button[class*="-skip-"]');

  if (skipButton) {
    // Method 1: Click the skip button
    skipButton.click();
    return;
  }

  // Method 2: Set the video's current time to the maximum value
  document.querySelector('video').currentTime = Number.MAX_VALUE;
};
