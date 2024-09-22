import React, { useState, useEffect } from "react";
import { Pagination, PaginationItem, Box, Typography } from "@mui/material";
import { ceil } from "lodash";
import { useQueryParams, NumberParam } from "use-query-params";
import { PaginationProps } from "./pagination-types";

export default function PaginationComponent({
  activePage,
  total,
  perPage,
  onClick,
}: PaginationProps): JSX.Element {
  const pages = ceil(total / perPage); // Tính số trang
  const [active, setActive] = useState(activePage);
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
  });

  const handleClickItem = (page: number) => {
    setActive(page);
    setQuery({ page });
    if (onClick) {
      onClick(page);
    }
  };

  useEffect(() => {
    if (!query.page) return;
    handleClickItem(query.page);
  }, [query.page]);

  return (
    <Box display="flex" justifyContent="end" alignItems="center" my={2}>
      <Typography variant="body2" mr={2}>
        Hiển thị {1 + (active - 1) * perPage}～
        {Math.min(perPage * active, total)} trong tổng số {total}
      </Typography>
      <Pagination
        count={pages} // Tổng số trang
        page={active} // Trang hiện tại
        onChange={(_, page) => handleClickItem(page)} // Xử lý khi người dùng chọn trang khác
        shape="rounded" // Tùy chọn kiểu dáng pagination
        variant="outlined" // Tùy chọn kiểu pagination
      />
    </Box>
  );
}
