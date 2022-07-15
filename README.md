# Unmute Reddit videos

[Github](https://github.com/FlowerForWar/unmute.reddit.videos), [Greasy Fork](https://greasyfork.org/en/scripts/445557-unmute-reddit-videos)

A User script to override the default behavior of Reddit videos, that is being played as muted.  
Shortcut to set the default volume (shift+alt+o).

## Issues / Facts

- By design, and for a good reason, web browsers disallow auto-play  
  for videos when they are not muted, unless you interact with the page first
- The volume slider in Reddit videos doesn't actually match the volume  
  of the video, but this user script does.
- When using custom default volume, the way to change the volume, is by  
  the slider, only when the video is being played, as it would always  
  use the default volume when played after paused.

## Changelog

#### 0.04 (22-07-15)

- Fix when [viewing embedded videos](https://www.reddit.com/r/firefox/comments/uxvyc1/comment/ifu464u/?utm_source=reddit&utm_medium=web2x&context=3). [Example post](https://www.reddit.com/r/NameThatSong/comments/vx2gso/genre_soft_piano_solo_maybe_from_a_video_game_or/).

#### 0.03 (22-07-01)

- Add support for old.reddit.com
- Switch to a different approach when using custom default volume. Now, videos will  
  always play with the default volume, and the way to change the volume, is by  
  the slider, only when the video is being played. This to overcome the the second issue [here](https://github.com/FlowerForWar/unmute.reddit.videos/blob/1540157ccb92aabd671ac2568d820b4faaba60e6/README.md)

#### 0.02 (22-05-29)

- Add a shortcut to set the default volume (shift+alt+o).

## License

[MIT](https://github.com/FlowerForWar/unmute.reddit.videos/blob/main/LICENSE)
