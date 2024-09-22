import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import TableCommon from "@src/Components/Common/Table/TableCommon";
import { theme } from "@src/theme";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PaymentModal from "@src/Components/Modal/PaymentModal";
import SpinnerComponent from "@src/Components/Common/SpinnerComponent/SpinnerComponent";
import ConfirmationDialog from "@src/Components/Modal/ConfirmationDialog";

interface UserData {
  id: number;
  serviceName: string;
  unitPrice: number;
  quantity: number;
  totalFee: number;
  payed: boolean;
}

const data: UserData[] = [
  {
    id: 1,
    serviceName: "Khám bệnh số 01",
    unitPrice: 100000,
    payed: true,
    quantity: 1,
    totalFee: 100000,
  },
  {
    id: 2,
    serviceName: "Khám bệnh số 01",
    unitPrice: 100000,
    payed: false,
    quantity: 1,
    totalFee: 100000,
  },
  {
    id: 3,
    serviceName: "Khám bệnh số 01",
    unitPrice: 100000,
    payed: false,
    quantity: 1,
    totalFee: 100000,
  },
  {
    id: 4,
    serviceName: "Khám bệnh số 01",
    unitPrice: 100000,
    payed: false,
    quantity: 1,
    totalFee: 100000,
  },
  {
    id: 5,
    serviceName: "Khám bệnh số 01",
    unitPrice: 100000,
    payed: false,
    quantity: 1,
    totalFee: 100000,
  },
  {
    id: 6,
    serviceName: "Khám bệnh số 01",
    unitPrice: 100000,
    payed: false,
    quantity: 1,
    totalFee: 100000,
  },
  {
    id: 7,
    serviceName: "Khám bệnh số 01",
    unitPrice: 100000,
    payed: false,
    quantity: 1,
    totalFee: 100000,
  },
];

export const Billing: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<UserData | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleRowSelectionChange = (rows: UserData[]) => {
    setSelectedRows(rows);
  };

  const columns = [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      size: 40,
    },
    {
      accessorKey: "id",
      header: "Tên dịch vụ",
      enableSorting: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "serviceName",
      header: "Name",
      enableSorting: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "unitPrice",
      header: "Đơn giá",
      enableSorting: true,
      cell: ({ row }: any) => (
        <Typography
          fontSize={13}
          color={theme.palette.text.secondary}
          fontWeight={600}
        >{`${row.original.unitPrice.toLocaleString()}đ`}</Typography>
      ),
    },
    {
      accessorKey: "quantity",
      header: "SL",
      enableSorting: true,
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "totalFee",
      header: "Thành tiền",
      enableSorting: true,
      cell: ({ row }: any) => (
        <Typography
          fontSize={13}
          color={theme.palette.text.secondary}
          fontWeight={600}
        >{`${row.original.totalFee.toLocaleString()}đ`}</Typography>
      ),
    },
    {
      accessorKey: "payed",
      header: "Đã TH",
      enableSorting: true,
      cell: ({ row }: any) => (
        <Checkbox
          checked={row.original.payed}
          color="secondary"
          sx={{ userSelect: "none", pointerEvents: "none" }}
        />
      ),
    },
    {
      id: "action",
      header: "",
      cell: ({ row }: any) => (
        <>
          {!row.original.payed && (
            <IconButton aria-label="delete" onClick={() => {
              setCurrentRow(row.original);
              setOpenDeleteModal(true);
            }}>
              <DeleteIcon />
            </IconButton>
          )}
        </>
      ),
      size: 40,
    },
  ];

  return (
    <Box>
      <SpinnerComponent isLoading={loading} />
      <TableCommon
        data={data}
        columns={columns}
        onRowSelectionChange={handleRowSelectionChange}
      />
      {selectedRows.length > 0 && <PaymentModal selectedRows={selectedRows} />}
      <ConfirmationDialog
        open={openDeleteModal}
        title="Xoá bản ghi"
        handleClose={() => setOpenDeleteModal(false)}
        secondBtnEvent={() => setOpenDeleteModal(false)}
        firstBtnEvent={() => setOpenDeleteModal(false)}
      >
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography>{currentRow?.serviceName + '-' + currentRow?.totalFee}</Typography>
        </Box>
      </ConfirmationDialog>
    </Box>
  );
};
