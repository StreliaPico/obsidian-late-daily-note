import { App, Editor, MarkdownView, Modal, Notice, ObsidianProtocolData, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { appHasDailyNotesPluginLoaded, createDailyNote, getAllDailyNotes, getDailyNote } from 'obsidian-daily-notes-interface';

// Remember to rename these classes and interfaces!

interface LateDailyNotePluginSettings {
	hourOffset: Number;
}

const DEFAULT_SETTINGS: LateDailyNotePluginSettings = {
	hourOffset: 5,
}

export default class LateDailyNotePlugin extends Plugin {
	settings: LateDailyNotePluginSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('calendar', 'Open today\'s daily note', async () => {
            this.openDailyNote();
		});

        this.registerObsidianProtocolHandler('opendailynote', (params: ObsidianProtocolData) => this.handleObsidianProtocol(this, params));
        this.addSettingTab(new SettingTab(this.app, this));
	}

    async openDailyNote() {
        if (!appHasDailyNotesPluginLoaded()) {
            return;
        }

        const date = window.moment().subtract(Number(this.settings.hourOffset), "hours");

        let note = getDailyNote(date, getAllDailyNotes());
        if (!note) {
            note = await createDailyNote(date);
        }
        this.app.workspace.openLinkText(note.path, '', true);
    }

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

    async handleObsidianProtocol(
        ctx: LateDailyNotePlugin,
        params: ObsidianProtocolData
    ) {
        await ctx.loadSettings();
        await ctx.openDailyNote();
    }
}


class SettingTab extends PluginSettingTab {
	plugin: LateDailyNotePlugin;

	constructor(app: App, plugin: LateDailyNotePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Hour Offset')
			.setDesc('Hours after midnight before counted as the next day')
			.addText(text => text
				.setPlaceholder('5')
				.setValue(String(this.plugin.settings.hourOffset))
				.onChange(async (value) => {
					this.plugin.settings.hourOffset = Number(value);
					await this.plugin.saveSettings();
				}));
	}
}
