type ConstructUrlParams = {
  search: string;
  pageNumber: number;
  pathName: string;
};

export const constructUrl = ({
  search,
  pageNumber,
  pathName,
}: ConstructUrlParams) => {
  const searchParams = new URLSearchParams(search);
  searchParams.set("page", pageNumber.toString());
  return `${pathName}?${searchParams.toString()}`;
};

type ConstructPrevNextUrlProps = {
  currentPage: number;
  pageCount: number;
  search: string;
  pathName: string;
};

export const constructPrevOrNextUrl = ({
  currentPage,
  pageCount,
  search,
  pathName,
}: ConstructPrevNextUrlProps): { prevUrl: string; nextUrl: string } => {
  let prevPage = currentPage - 1;
  if (prevPage < 1) prevPage = pageCount;
  const prevUrl = constructUrl({ pageNumber: prevPage, search, pathName });

  let nextPage = currentPage + 1;
  if (nextPage > pageCount) nextPage = 1;
  const nextUrl = constructUrl({ pageNumber: nextPage, search, pathName });
  return { prevUrl, nextUrl };
};
