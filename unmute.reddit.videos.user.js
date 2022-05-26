// ==UserScript==
// @name           Unmute Reddit videos
// @namespace      https://github.com/FlowerForWar/unmute-reddit-videos
// @description    Override the default behavior of Reddit videos, that is being played as muted
// @version        0.01
// @author         FlowrForWar
// @match          https://www.reddit.com/*
// @grant          none
// @compatible     edge Tampermonkey or Violentmonkey
// @compatible     firefox Greasemonkey, Tampermonkey or Violentmonkey
// @compatible     chrome Tampermonkey or Violentmonkey
// @compatible     opera Tampermonkey or Violentmonkey
// @supportURL     https://github.com/FlowerForWar/unmute-reddit-videos/issues
// @license        MIT
// ==/UserScript==

const play = HTMLMediaElement.prototype.play;
HTMLMediaElement.prototype.play = function() {
	if (this.muted) {
		try {
			const muteButton = this.offsetParent.lastElementChild.lastElementChild.lastElementChild;
			if (muteButton.tagName === 'BUTTON' && muteButton.lastElementChild.tagName === 'svg') muteButton.click();
		} catch (error) {
			this.muted = !1;
		}
	}
	play.apply(this);
};
