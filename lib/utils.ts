import qs from "query-string";

interface URLQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: URLQueryParams) => {
  const currentURL = qs.parse(params);

  currentURL[key] = value;

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentURL },
    { skipNull: true }
  );
};

interface RemoveURLQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveURLQueryParams) => {
  const currentURL = qs.parse(params);

  keysToRemove.forEach((key) => delete currentURL[key]);

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentURL },
    { skipNull: true }
  );
};
