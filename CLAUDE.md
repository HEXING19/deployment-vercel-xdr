# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains a Chrome browser extension for XDR (Extended Detection and Response) and GPT deployment planning. The extension is designed as a deployment wizard that helps users select appropriate deployment scenarios, check hardware compatibility, and guide them through the deployment process.

## Core Architecture

- **Static Extension**: Pure HTML/CSS/JavaScript implementation using Manifest V3
- **No Build Process**: Direct browser loading without compilation or bundling
- **Chrome Storage**: Uses Chrome's storage API for persistent data management
- **Responsive Design**: Optimized for Chrome extension popup window (800x600px)

## File Structure

```
extension/
├── manifest.json          # Chrome extension configuration (Manifest V3)
├── popup.html             # Main UI interface
├── popup.css              # Complete styling system
├── popup.js               # Core business logic and DOM manipulation
├── font-awesome.min.css   # Icon library
├── icons/                 # Extension icons (16px, 48px, 128px)
├── assets/                # Additional resources
├── test.html              # Development test file
└── README.md              # Documentation
```

## Key Features

1. **Deployment Scenario Selection**: 
   - XDR+GPT deployment (X86 XDR, Operation GPT, Operation+Traffic Detection GPT)
   - Standalone deployment (Data Base, AI Security Platform, AICP)

2. **Hardware Compatibility Validation**:
   - CPU, memory, storage, network port requirements
   - RAID card compatibility checking
   - GPU validation for GPT scenarios (4090/4090D with specific quantity rules)

3. **Deployment Planning Tools**:
   - Network topology guidance
   - Port matrix requirements
   - Step-by-step deployment instructions

## Development Commands

**Extension Loading**:
```bash
# No build process required
# Load directly in Chrome:
# 1. Navigate to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the extension directory
```

**Testing**:
```bash
# Open test.html in browser for structure validation
open test.html
```

## Hardware Standards Configuration

The extension maintains comprehensive hardware requirements in `popup.js`:

- **XDR**: 16+ cores, 256GB+ RAM, 240GB+ system disk, 10TB+ data disk
- **GPT**: 48+ cores, 512GB+ RAM, 480GB+ system disk, 32TB+ data disk
- **GPU Requirements**: 4090/4090D GPUs with specific quantity validation (4/6/8 for Operation GPT)
- **RAID Compatibility**: Predefined list of supported RAID card models

## Chrome Extension Specifics

- **Manifest V3**: Uses modern extension standards
- **Permissions**: Only requires `storage` permission for data persistence
- **Popup Dimensions**: Fixed 800x600px optimized for deployment wizard UI
- **Storage**: Chrome sync storage for cross-device configuration persistence

## Compatibility Checking Logic

The extension implements sophisticated validation:

1. **Resource Validation**: Checks if hardware meets minimum requirements
2. **Component Matching**: Validates RAID cards and GPU models against approved lists
3. **Special Rules**: GPT scenarios have specific GPU quantity restrictions
4. **Result Classification**: Success/Warning/Error based on compatibility level

## Deployment Integration

- **External Documentation**: Links to official Sangfor product documentation
- **Version Specificity**: Designed for XDR 2.0.42+ versions
- **Multi-Platform**: Supports both hardware and virtualization deployment scenarios

## UI Architecture

- **Modular Sections**: Collapsible sections for different configuration areas
- **Tab Navigation**: Multi-tab interface for deployment details
- **Interactive Forms**: Dynamic form validation with real-time feedback
- **Responsive Layout**: CSS Grid and Flexbox for optimal layout

## Notable Implementation Details

- **No External Dependencies**: Self-contained with embedded Font Awesome
- **Vanilla JavaScript**: Pure JS without frameworks for minimal footprint
- **CSS Custom Properties**: Consistent theming through CSS variables
- **Chrome Storage Integration**: Automatic form data persistence