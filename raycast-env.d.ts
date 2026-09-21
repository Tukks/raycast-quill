/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `fix-grammar` command */
  export type FixGrammar = ExtensionPreferences & {}
  /** Preferences accessible in the `rephrase` command */
  export type Rephrase = ExtensionPreferences & {
  /** Default Tone - Tone used until you pick one from the action panel; after that, the last tone you picked is used. */
  "defaultTone": "default" | "professional" | "casual" | "friendly" | "formal" | "concise"
}
  /** Preferences accessible in the `ocr-screenshot` command */
  export type OcrScreenshot = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `fix-grammar` command */
  export type FixGrammar = {}
  /** Arguments passed to the `rephrase` command */
  export type Rephrase = {}
  /** Arguments passed to the `ocr-screenshot` command */
  export type OcrScreenshot = {}
}

