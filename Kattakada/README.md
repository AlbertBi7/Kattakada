# Fahh Sound on Error 🎤

A VS Code extension that plays a "fahh" sound whenever your code encounters an error. Never miss a mistake again!

## Features

- **Editor Diagnostics**: Plays sound when linting/syntax errors are detected in the editor.
- **Task Failures**: Plays sound when a VS Code task (e.g., build, run, test) fails with a non-zero exit code.
- **Manual Test**: Command `Fahh: Test Sound` to verify everything is working.

## Installation

### From VSIX (Easiest)
1. Download the latest `.vsix` from the releases.('https://github.com/praneethreddie/fahh-sound-on-error/releases/tag/fahh')
2. In VS Code, go to the Extensions view (`Ctrl+Shift+X`).
3. Click the three dots `...` in the top right.
4. Select **Install from VSIX...** and pick the file.

### For Developers
1. Clone this repo.
2. Run `npm install`.
3. Press `F5` to open the Extension Development Host.

## How to use

1. **Linting Errors**: Just type some broken code (e.g., `let x = ;`). You'll hear the "fahh" as soon as the red squiggly appears.
2. **Build Errors**: Run a task via **Terminal > Run Task...**. If it fails, you'll hear the sound.

## Requirements
- **Windows**: Uses PowerShell for audio playback.

## License
MIT
