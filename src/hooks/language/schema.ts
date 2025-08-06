import * as z from 'zod';

export const enum SupportedLanguages {
  DE_DE = 'de-DE',
  EN_EN = 'en-EN',
  FR_FR = 'fr-FR',
}

export const languageSchema = z.enum([
  SupportedLanguages.DE_DE,
  SupportedLanguages.EN_EN,
  SupportedLanguages.FR_FR,
]);

export type Language = z.infer<typeof languageSchema>;
