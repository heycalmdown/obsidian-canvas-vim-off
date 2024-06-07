import { TextFileView, Plugin } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		this.registerEvent(this.app.workspace.on('active-leaf-change', (leaf) => {
			const extension = this.app.workspace.getActiveViewOfType(TextFileView)?.file?.extension;
			if (extension === 'canvas') {
				console.log('vim mode off')
				// @ts-expect-error
				this.app.vault.setConfig("vimMode", false);
				// @ts-expect-error
				this.app.vault.setConfig("showLineNumber", false);
			} else {
				console.log('vim mode on')
				// @ts-expect-error
				this.app.vault.setConfig("vimMode", true);
				// @ts-expect-error
				this.app.vault.setConfig("showLineNumber", true);
			}
		}));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
