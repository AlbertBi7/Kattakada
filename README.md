# Kattakada Sound on Error 🎤

A VS Code extension that plays a sound whenever your code encounters an error. Never miss a mistake again!

## Features

- **Editor Diagnostics**: Plays sound when linting/syntax errors are detected in the editor.
- **Task Failures**: Plays sound when a VS Code task (e.g., build, run, test) fails with a non-zero exit code.
- **Terminal Errors**: Plays sound when a terminal command fails with a non-zero exit code.
- **Manual Test**: Command `Kattakada` to verify everything is working.

## Installation

### From VSIX (Easiest)
1. Download the latest `.vsix` from the releases.
2. In VS Code, go to the Extensions view (`Ctrl+Shift+X`).
3. Click the three dots `...` in the top right.
4. Select **Install from VSIX...** and pick the file.

### For Developers
1. Clone this repo:
   ```bash
   git clone https://github.com/praneethreddie/kattakada-sound-on-error.git
   cd kattakada-sound-on-error
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Open the folder in VS Code:
   ```bash
   code .
   ```
4. Press `F5` to compile and launch the Extension Development Host.
5. In the new VS Code window, test by:
   - Opening Command Palette (`Ctrl+Shift+P`) and typing `Kattakada`
   - Or running a failing terminal command like `exit 1`

## Building VSIX

To create a distributable package:
```bash
npm install -g @vscode/vsce
vsce package
```
This creates a `.vsix` file you can share or install.

## How to use

1. **Linting Errors**: Just type some broken code (e.g., `let x = ;`). You'll hear the sound as soon as the red squiggly appears.
2. **Build Errors**: Run a task via **Terminal > Run Task...**. If it fails, you'll hear the sound.
3. **Terminal Errors**: Run any failing command in the integrated terminal.

## Requirements

### Windows
Uses PowerShell MediaPlayer (built-in, no setup needed).

### macOS
Uses `afplay` (built-in, no setup needed).

### Linux
Requires one of these audio players (tried in order):
- `mpg123` - Install: `sudo apt install mpg123`
- `mpv` - Install: `sudo apt install mpv`
- `ffplay` - Install: `sudo apt install ffmpeg`
- `vlc` - Install: `sudo apt install vlc`

## License
MIT
