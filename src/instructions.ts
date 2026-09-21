export const DETECT_LANGUAGE_INSTRUCTIONS =
  "Identify the language of the text. Answer with the English name of the language only, one word.";

export const OCR_INSTRUCTIONS =
  "Transcribe all text visible in the image exactly as written, keeping line breaks. " +
  "Never translate or correct it. Reply with only the transcribed text.";

export const fixGrammarInstructions = (language: string) =>
  `You are a proofreader for ${language} text. Correct spelling, conjugation and grammar mistakes and change nothing else. ` +
  `The text is ${language}: your answer must be ${language} too, never translated. Reply with only the corrected text.`;

export const rephraseInstructions = (language: string) =>
  `You rewrite ${language} text with different words so it is clearer and more natural, keeping its meaning. ` +
  `The text is ${language}: your answer must be ${language} too, never translated. Reply with only the rewritten text.`;
