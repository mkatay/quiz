import React from 'react';

interface QueryParamsType {
  queryParams: { [key: string]: string };
  updateQueryParams: (newParams: { [key: string]: string }) => void;
};

const QueryParamsContext = React.createContext({
  queryParams: {},
  updateQueryParams: (newParams) => {},
} as QueryParamsType);

export function QueryParamsProvider({ children }: { children: React.ReactNode }) {
  const [queryParams, setQueryParams] = React.useState(getQueryParamsFromLocation());

  React.useEffect(() => {
    function handleLocationChange() {
      setQueryParams(getQueryParamsFromLocation());
    }

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  function updateQueryParams(newParams: { [key: string]: string }) {
    const currentParams = new URLSearchParams(window.location.search);

    for (const key in newParams) {
      if (newParams[key] === null || newParams[key] === undefined || newParams[key] === '') {
        currentParams.delete(key);
      } else {
        currentParams.set(key, newParams[key]);
      }
    }

    const newSearch = currentParams.toString();
    const newUrl = window.location.pathname + (newSearch ? '?' + newSearch : '') + window.location.hash;
    window.history.pushState(null, '', newUrl);
    setQueryParams(getQueryParamsFromLocation());
  }

  return (
    <QueryParamsContext.Provider value={{ queryParams: queryParams, updateQueryParams: updateQueryParams }}>
      {children}
    </QueryParamsContext.Provider>
  );
}

function getQueryParamsFromLocation() {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
}

export function useQueryParams(): QueryParamsType {
  const context = React.useContext(QueryParamsContext);
  if (context === undefined) {
    throw new Error('useQueryParams must be used within a QueryParamsProvider');
  }
  return context;
}


export default QueryParamsProvider;