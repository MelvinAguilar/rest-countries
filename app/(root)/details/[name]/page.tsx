import BackButton from "@/components/BackButton";
import { ArrowLeftIcon } from "@/components/Icons";
import { Container } from "@/containers/Container";
import { getCountryByName } from "@/lib/actions/country.action";
import Image from "next/image";
import Link from "next/link";

type CountryCardProps = {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  flags: {
    png: string;
  };
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  tld: string[];
  languages: {
    [key: string]: string;
  };
  borders: string[];
};

export default async function Home({ params, searchParams }: any) {
  const countryName = params.name;
  const results: CountryCardProps = await getCountryByName(
    decodeURI(countryName),
  );
  const borders = results.borders;

  return (
    <Container as="main">
      <BackButton />

      <div className="flex flex-col gap-16 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-1/2">
          <Image
            src={results.flags.png}
            alt={`Flag of ${results.name}`}
            width={700}
            height={500}
          />
        </div>

        <div className="flex w-full flex-col gap-8 md:w-1/2">
          <h1 className="country-title">{results.name}</h1>

          <div className="flex flex-col flex-wrap gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <p>
                <span className="font-semibold">Native Name:</span>{" "}
                {results.nativeName}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {results.population}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {results.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{" "}
                {results.subregion}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {results.capital}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {Object.values(results.currencies)
                  .map((currency: any) => currency.name)
                  .join(", ")}
              </p>
              <p className="flex max-w-[18.75rem] flex-wrap gap-1">
                <span className="font-semibold">Languages:</span>
                {Object.values(results.languages)
                  .map((language: any) => language.name)
                  .join(", ")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-semibold">Border Countries:</span>
            <div className="flex flex-wrap gap-2">
              {borders.length > 0 ? (
                borders.map((border) => (
                  <Link
                    href={`/details/${border}/`}
                    key={border}
                    className="shadow-btn rounded-md border border-gray-300 px-4 py-2"
                  >
                    {border}
                  </Link>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
