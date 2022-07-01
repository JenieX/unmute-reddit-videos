// ==UserScript==
// @name           Unmute Reddit videos
// @namespace      https://github.com/FlowerForWar/unmute.reddit.videos
// @description    Override the default behavior of Reddit videos, that is being played as muted
// @version        0.03
// @author         FlowrForWar
// @match          https://www.reddit.com/*
// @match          https://old.reddit.com/*
// @grant          GM.getValue
// @grant          GM.setValue
// @grant          GM_getValue
// @grant          GM_setValue
// @run-at         document-start
// @compatible     edge Tampermonkey or Violentmonkey
// @compatible     firefox Tampermonkey or Violentmonkey
// @compatible     chrome Tampermonkey or Violentmonkey
// @compatible     opera Tampermonkey or Violentmonkey
// @supportURL     https://github.com/FlowerForWar/unmute.reddit.videos/issues
// @icon           https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @license        MIT
// ==/UserScript==

function setStorageValue(key, value) {
  return (typeof GM !== 'undefined' ? GM.setValue : GM_setValue)(key, value);
}

function getStorageValue(key) {
  return (typeof GM !== 'undefined' ? GM.getValue : GM_getValue)(key);
}

const oldReddit = window.location.host === 'old.reddit.com';
let defaultVolume;

(async () => {
  defaultVolume = await getStorageValue('default-volume');

  const { play } = HTMLMediaElement.prototype;
  HTMLMediaElement.prototype.play = async function () {
    console.log(this);
    if (this.muted) {
      try {
        if (oldReddit) {
          this.offsetParent.querySelector('button.volume').click();
        } else {
          const muteButton = this.offsetParent.lastElementChild.lastElementChild.lastElementChild;
          if (muteButton.tagName === 'BUTTON' && muteButton.lastElementChild.tagName === 'svg') muteButton.click();
        }
      } catch (error) {
        this.muted = !1;
      }
    }
    if (defaultVolume) {
      this.volume = defaultVolume / 100;

      /**
       * Change the volume slider to match the volume, and
       * for whatever reason, the first video will not apply
       * the change to the slider unless there is a delay.
       */
      setTimeout(() => {
        try {
          const volumeSlider = this.offsetParent.lastElementChild.lastElementChild.querySelector('div[style^="height"]');
          volumeSlider.style.setProperty('height', `${this.volume * 100}%`);
        } catch (error) {
          // console.error(error);
        }
      }, 100);
    }

    play.apply(this);
  };
})();

window.addEventListener('keydown', async ({ key, shiftKey, altKey }) => {
  if (!(key === 'O' && shiftKey && altKey)) return;

  const newDefaultVolume = Number(
    prompt(
      [
        //
        'User script  |  Unmute Reddit videos',
        'Changing the default volume',
        'Enter a number between 1-100',
      ].join('\n\n'),
      defaultVolume || 100,
    ),
  );

  if (!newDefaultVolume) {
    alert('Invalid input');
    return;
  }
  if (!(newDefaultVolume > 0 && newDefaultVolume <= 100)) {
    alert('Number is out of range');
    return;
  }

  await setStorageValue('default-volume', newDefaultVolume);

  const updatedDefaultVolume = await getStorageValue('default-volume');
  alert(
    [
      //
      'User script  |  Unmute Reddit videos',
      'Updated default volume',
      `Default volume: ${updatedDefaultVolume}%`,
    ].join('\n\n'),
  );
  defaultVolume = updatedDefaultVolume;
});
