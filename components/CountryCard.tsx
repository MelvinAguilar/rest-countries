import Image from "next/image";
import Link from "next/link";
import React from "react";

type CountryCardProps = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital: string;
};

const CountryCard = ({
  name,
  flag,
  population,
  region,
  capital,
}: CountryCardProps) => {
  return (
    <div className="interactive relative rounded-md shadow-lg">
      <Image
        src={flag}
        alt={`Flag of ${name}`}
        width={264}
        height={500}
        className="aspect-video w-full"
      />
      <div className="flex flex-col gap-2 p-6">
        <h2 className="country-title mb-2">{name}</h2>
        <p>
          <span className="font-semibold">Population:</span>{" "}
          {population.toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Region:</span> {region}
        </p>
        <p>
          <span className="font-semibold">Capital:</span> {capital}
        </p>
      </div>
      <Link
        href={`/details/${name}/`}
        className="absolute inset-0 h-full w-full"
      >
        <span className="sr-only">See More Details</span>
      </Link>
    </div>
  );
};

export default CountryCard;
