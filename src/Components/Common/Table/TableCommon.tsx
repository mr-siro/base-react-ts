import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { styles } from "./styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface CommonTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  onRowSelectionChange?: (selectedRows: T[]) => void;
  manualSorting?: boolean;
  onSortChange?: (sort: SortingState) => void;
}

function TableCommon<T extends object>({
  data,
  columns,
  onRowSelectionChange,
  manualSorting = false,
  onSortChange,
}: CommonTableProps<T>) {
  const [rowSelection, setRowSelection] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleSortingChange = (
    updater: SortingState | ((old: SortingState) => SortingState)
  ) => {
    // Xử lý logic cập nhật sorting
    const newSorting =
      typeof updater === "function" ? updater(sorting) : updater;
    setSorting(newSorting);

    // Nếu sử dụng manual sorting, gọi callback `onSortChange`
    if (manualSorting && onSortChange) {
      onSortChange(newSorting);
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      sorting,
    },
    manualSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: handleSortingChange,
    getSortedRowModel: !manualSorting ? getSortedRowModel() : undefined,
  });

  useEffect(() => {
    const selectedRows = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => data[parseInt(key, 10)]);
    onRowSelectionChange?.(selectedRows);
  }, [rowSelection, data]);

  const classes = styles.table;

  return (
    <TableContainer component={Paper} sx={classes.paper}>
      <Table
        sx={{
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
      >
        <TableHead sx={classes.header}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  sx={{
                    width: header.column.columnDef.size || "auto",
                    cursor: "pointer",
                  }}
                  onClick={ header.column.getCanSort()
                    ? header.column.getToggleSortingHandler()
                    : undefined}
                >
                  <Box display={"flex"}>
                    <Box>
                      {typeof header.column.columnDef.header === "function"
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header}
                    </Box>
                    {header.column.getCanSort() &&  <Box ml={1}>
                      {header.column.getIsSorted() === "asc" ? (
                        <Box display={"flex"} flexDirection={"column"}>
                          <ArrowDropUpIcon fontSize="small" />
                          <ArrowDropDownIcon
                            fontSize="small"
                            sx={{ transform: "translateY(-12px)" }}
                            color="disabled"
                          />
                        </Box>
                      ) : header.column.getIsSorted() === "desc" ? (
                        <Box display={"flex"} flexDirection={"column"}>
                          <ArrowDropUpIcon fontSize="small"  color="disabled"/>
                          <ArrowDropDownIcon
                            fontSize="small"
                            sx={{ transform: "translateY(-12px)" }}
                          />
                        </Box>
                      ) : (
                        <Box display={"flex"} flexDirection={"column"}>
                          <ArrowDropUpIcon fontSize="small" />
                          <ArrowDropDownIcon
                            fontSize="small"
                            sx={{ transform: "translateY(-12px)" }}
                          />
                        </Box>
                      )}
                    </Box>}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody sx={classes.body}>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} selected={row.getIsSelected()}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  sx={{
                    width: cell.column.columnDef.size || "auto",
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableCommon;
