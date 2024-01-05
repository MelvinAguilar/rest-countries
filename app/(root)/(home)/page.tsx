import CountryCard from "@/components/CountryCard";
import Filters from "@/components/Filters";
import PageSizeSelector from "@/components/PageSizeSelector";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { Container } from "@/containers/Container";
import { getCountryList } from "@/lib/actions/country.action";
import Image from "next/image";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

type CountryCardProps = {
  name: string;
  flags: {
    png: string;
  };
  population: number;
  region: string;
  capital: string;
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const results = await getCountryList({
    searchQuery: searchParams.query,
    filter: searchParams.filter,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    sort: searchParams.sort,
    pageSize: searchParams.pageSize ? parseInt(searchParams.pageSize) : 10,
  });

  return (
    <Container as="main">
      <div className="mt-12 flex justify-between gap-4">
        <SearchBar />
        <Filters />
      </div>

      <div className="grid grid-cols-1 gap-8 py-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {results.countries.length > 0 ? (
          results.countries.map((country: CountryCardProps) => (
            <CountryCard
              key={country.name}
              name={country.name}
              flag={country.flags.png}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          ))
        ) : (
          <div className="flex w-full items-center justify-center">
            <Image
              src="/images/no-results.png"
              alt="No results found"
              width={500}
              height={500}
            />
            <p className="text-2xl font-bold text-gray-500">No results found</p>
          </div>
        )}
      </div>

      <Pagination
        total={results.total}
        limit={searchParams.pageSize ? parseInt(searchParams.pageSize) : 10}
        currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
      />
      <PageSizeSelector total={results.total} />
    </Container>
  );
}
