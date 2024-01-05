import { Schema, model, models, Document } from "mongoose";

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

interface Flag {
  svg: string;
  png: string;
}

interface RegionalBloc {
  acronym: string;
  name: string;
}

interface Translations {
  [key: string]: string;
}

export interface ICountry extends Document {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  flags: Flag;
  currencies: Currency[];
  languages: Language[];
  translations: Translations;
  flag: string;
  regionalBlocs: RegionalBloc[];
  cioc: string;
  independent: boolean;
}

const CountrySchema = new Schema<ICountry>({
  name: { type: String, required: true },
  topLevelDomain: { type: [String], required: true },
  alpha2Code: { type: String, required: true },
  alpha3Code: { type: String, required: true },
  callingCodes: { type: [String], required: true },
  capital: { type: String, required: true },
  altSpellings: { type: [String], required: true },
  subregion: { type: String, required: true },
  region: { type: String, required: true },
  population: { type: Number, required: true },
  latlng: { type: [Number], required: true },
  demonym: { type: String, required: true },
  area: { type: Number, required: true },
  timezones: { type: [String], required: true },
  borders: { type: [String], required: true },
  nativeName: { type: String, required: true },
  numericCode: { type: String, required: true },
  flags: { type: Object, required: true },
  currencies: { type: [Object], required: true },
  languages: { type: [Object], required: true },
  translations: { type: Object, required: true },
  flag: { type: String, required: true },
  regionalBlocs: { type: [Object], required: true },
  cioc: { type: String, required: true },
  independent: { type: Boolean, required: true },
});

const Country = models.Country || model<ICountry>("Country", CountrySchema);

export default Country;
