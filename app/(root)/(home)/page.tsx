import CountryContainer from "@/components/CountryContainer";
import Filters from "@/components/Filters";
import PageSizeSelector from "@/components/PageSizeSelector";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { Container } from "@/containers/Container";
import { getCountryList } from "@/lib/actions/country.action";

interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const results = await getCountryList({
    searchQuery: searchParams.query,
    filter: searchParams.filter,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    sort: searchParams.sort,
    pageSize: searchParams.pageSize ? parseInt(searchParams.pageSize) : 10,
  }).catch((err) => {
    return {
      countries: [],
      total: 0,
    };
  });

  return (
    <Container as="main">
      <div className="mt-12 flex flex-wrap justify-between gap-4">
        <SearchBar />
        <Filters />
      </div>

      <CountryContainer results={JSON.parse(JSON.stringify(results))} />

      <Pagination
        total={results.total}
        limit={searchParams.pageSize ? parseInt(searchParams.pageSize) : 10}
        currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
      />
      <PageSizeSelector total={results.total} />
    </Container>
  );
}
