import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import { openToast } from "@src/Helpers/functions";

interface PaymentModalProps {
  selectedRows: any[];
}

const PaymentModal: React.FC<PaymentModalProps> = ({ selectedRows }) => {
  const [open, setOpen] = useState(false);

  // Mở modal khi selectedRows có ít nhất một item
  useEffect(() => {
    if (selectedRows.length > 0) {
      setOpen(true); // Modal luôn mở khi có ít nhất một hàng được chọn
    }

    // Đóng modal chỉ khi tất cả các hàng bị bỏ chọn
    if (selectedRows.length === 0) {
      setOpen(false);
    }
  }, [selectedRows]);

  return (
    <>
      {open && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 120,
            backgroundColor: "#f9f9f9",
            boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
            padding: 3,
            zIndex: 1000,
          }}
        >
          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                console.log("Thanh toán và In");
                setOpen(false);
                openToast({ message: 'Thanh toán thành công!' })
              }}
            >
              Thanh toán và In (Ctrl + L)
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                console.log("Thanh toán");
                setOpen(false);
                openToast({ message: 'Thanh toán thành công!' })
              }}
            >
              Thanh toán (Ctrl + T)
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PaymentModal;
