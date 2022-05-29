// ==UserScript==
// @name           Unmute Reddit videos
// @namespace      https://github.com/FlowerForWar/unmute-reddit-videos
// @description    Override the default behavior of Reddit videos, that is being played as muted
// @version        0.02
// @author         FlowrForWar
// @match          https://www.reddit.com/*
// @grant          GM.getValue
// @grant          GM.setValue
// @grant          GM_getValue
// @grant          GM_setValue
// @compatible     edge Tampermonkey or Violentmonkey
// @compatible     firefox Tampermonkey or Violentmonkey
// @compatible     chrome Tampermonkey or Violentmonkey
// @compatible     opera Tampermonkey or Violentmonkey
// @supportURL     https://github.com/FlowerForWar/unmute-reddit-videos/issues
// @license        MIT
// ==/UserScript==

(async function() {
	let default_volume = await getStorageValue('default-volume');

	const play = HTMLMediaElement.prototype.play;
	HTMLMediaElement.prototype.play = async function() {
		if (this.muted) {
			try {
				const muteButton = this.offsetParent.lastElementChild.lastElementChild.lastElementChild;
				if (muteButton.tagName === 'BUTTON' && muteButton.lastElementChild.tagName === 'svg') muteButton.click();
			} catch (error) {
				this.muted = !1;
			}
		}
		if (default_volume) {
			this.addEventListener('volumechange', volumechange);
			this.volume = this.dataset.volume ? Number(this.dataset.volume) : default_volume / 100;

			setTimeout(() => {
				try {
					const volumeSlider = this.offsetParent.lastElementChild.lastElementChild.querySelector('div[style^="height"]');
					// For whatever reason,
					// the first video will not apply the change to the slider unless there is a delay.
					volumeSlider.style.setProperty('height', `${this.volume * 100}%`);
				} catch (error) {}
			}, 100);
		}

		// console.log(this.volume);
		play.apply(this);
	};

	function volumechange() {
		this.dataset.volume = this.volume;
	}

	async function setStorageValue(key, value) {
		await (typeof GM !== 'undefined' ? GM.setValue : GM_setValue)(key, value);
	}
	async function getStorageValue(key) {
		return await (typeof GM !== 'undefined' ? GM.getValue : GM_getValue)(key);
	}

	window.addEventListener('keydown', async ({ key, shiftKey, altKey }) => {
		if (!(key === 'O' && shiftKey && altKey)) return;

		const prompt_data = prompt('User script  |  Unmute Reddit videos\n\nChanging the default volume\n\nEnter a number between 1-100', default_volume || 100);
		const prompt_data_as_number = Number(prompt_data);

		if (!prompt_data || !prompt_data_as_number) return alert('Invalid input');
		if (!(prompt_data_as_number > 0 && prompt_data_as_number <= 100)) return alert('Number is out of range');

		await setStorageValue('default-volume', prompt_data_as_number);
		const default_volume_fresh = await getStorageValue('default-volume');
		alert(`User script  |  Unmute Reddit videos\n\nUpdated default volume\n\nDefault volume: ${default_volume_fresh}%`);
		default_volume = default_volume_fresh;

		const videos = document.getElementsByTagName('video');
		for (let index = 0; index < videos.length; index++) videos[index].removeAttribute('data-volume');
	});
})();
