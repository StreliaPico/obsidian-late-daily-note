# Late Daily Notes

This plugin adds a replacement Obsidian Protocol and button to open Daily Note with configurable time offset.

Uses the [obsidian-daily-notes-interface](https://github.com/liamcain/obsidian-daily-notes-interface/) library.

## Usage

A new Daily Note button is automatically added to the sidebar. (This is indistinguishable from the existing Daily Note button so you should probably hide the other one.)

`obsidian://opendailynote` can also be called, with the same functionality as the button.

No command is added to the command palette (feel free to PR one if you need it).

The settings contains a single Number field for the offset in hours. Setting it to 5 for example will make it consider the next day to start at 5am.

## Install

Copy the `manifest.json` and `main.js` files to your vault's `.obsidian/plugins/obsidian-late-daily-notes` folder.

## Release

I'm a bit too busy to actually polish/publish this as an actual release as this was only cobbled together for my personal needs.

I'm also completely unfamiliar with the Obsidian codebase and best practices since I just started using this.

If somebody more familiar with all this wants to make this release-worthy, feel free to PR it.

Frankly, I'd rather Obsidian just include this feature in the actual Daily Notes plugin.

## Additional Notes

While [better-daily-notes-obsidian-plugin](https://github.com/showaykerker/better-daily-notes-obsidian-plugin) and [obsidian-daily-notes-opener](https://github.com/reorx/obsidian-daily-notes-opener) both have similar functionality, they're both too feature-rich for my needs nor do they include Obsidian Protocol support. I've tried modifying the latter to include it but the code forces notes to be opened in a new pane, which is unsupported on mobile (I think, anyway - there could be another reason it broke on my phone) which is the point at which I decided to give up and make this.