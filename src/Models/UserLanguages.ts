import { Language } from ".";

export default interface UserLanguage {
  ID: number;
  LanguageID: number;
  Level: string;
  ProfileID: number;
  Language: Language;
}
