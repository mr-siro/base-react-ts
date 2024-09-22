type PaginationProps = {
  activePage: number;
  total: number;
  perPage: number;
  first?: boolean;
  last?: boolean;
  previous?: boolean;
  next?: boolean;
  maxButtons?: number;
  hidden?: boolean;
  onClick?: (pageNumber: number) => void;
};

export { PaginationProps };