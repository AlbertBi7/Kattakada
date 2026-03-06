import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';

let lastErrorCount = 0;

function getRandomSoundPath(context: vscode.ExtensionContext): string {
    const audioFiles = ['NKD1.mp3', 'NKD2.mp3', 'NKD3.mp3', 'NKD4.mp3'];
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    return path.join(context.extensionPath, audioFiles[randomIndex]);
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Kattakada Sound extension is now active!');

    // Command to test the sound
    let disposable = vscode.commands.registerCommand('kattakada.testSound', () => {
        playSound(getRandomSoundPath(context));
        vscode.window.showInformationMessage('Kattakada!');
    });

    // --- 1. Diagnostic Listener (Editor Errors) ---
    const diagnosticListener = vscode.languages.onDidChangeDiagnostics((e) => {
        let currentErrorCount = 0;
        e.uris.forEach(uri => {
            const diagnostics = vscode.languages.getDiagnostics(uri);
            currentErrorCount += diagnostics.filter(d => d.severity === vscode.DiagnosticSeverity.Error).length;
        });

        if (currentErrorCount > lastErrorCount) {
            playSound(getRandomSoundPath(context));
        }
        lastErrorCount = currentErrorCount;
    });

    // --- 2. Task Listener (Runtime Errors) ---
    const taskListener = vscode.tasks.onDidEndTaskProcess((e) => {
        if (e.exitCode !== undefined && e.exitCode !== 0) {
            console.log(`Task ${e.execution.task.name} failed with exit code ${e.exitCode}`);
            playSound(getRandomSoundPath(context));
        }
    });

    // --- 3. Debug Listener (Crashes) ---
    const debugListener = vscode.debug.onDidTerminateDebugSession((session) => {
        // Optional logic for debug session crashes could go here
    });

    // --- 4. Terminal Listener (Command Failures) ---
    const terminalListener = vscode.window.onDidEndTerminalShellExecution((e) => {
        if (e.exitCode !== undefined && e.exitCode !== 0) {
            console.log(`Terminal command failed with exit code ${e.exitCode}`);
            playSound(getRandomSoundPath(context));
        }
    });

    context.subscriptions.push(disposable, diagnosticListener, taskListener, debugListener, terminalListener);
}

function playSound(soundPath: string) {
    let command: string;
    
    switch (process.platform) {
        case 'win32':
            // Windows: PowerShell with MediaPlayer
            const maxDuration = 3;
            command = `powershell -c "Add-Type -AssemblyName presentationCore; $media = New-Object System.Windows.Media.MediaPlayer; $media.Open('${soundPath}'); $media.Play(); while($media.NaturalDuration.HasTimeSpan -eq $false) { Start-Sleep -Milliseconds 100 }; $duration = [Math]::Min($media.NaturalDuration.TimeSpan.TotalSeconds, ${maxDuration}); Start-Sleep -Seconds $duration; $media.Stop(); $media.Close()"`;
            break;
        case 'darwin':
            // macOS: afplay is built-in
            command = `afplay "${soundPath}"`;
            break;
        case 'linux':
            // Linux: try multiple players that support MP3
            // mpg123 (common), mpv (modern), ffplay (ffmpeg), cvlc (VLC)
            command = `mpg123 -q "${soundPath}" 2>/dev/null || mpv --no-video --really-quiet "${soundPath}" 2>/dev/null || ffplay -nodisp -autoexit -loglevel quiet "${soundPath}" 2>/dev/null || cvlc --play-and-exit --quiet "${soundPath}" 2>/dev/null`;
            break;
        default:
            console.error(`Unsupported platform: ${process.platform}`);
            return;
    }

    exec(command, (error) => {
        if (error) {
            console.error(`Error playing sound: ${error.message}`);
        }
    });
}

export function deactivate() { }
