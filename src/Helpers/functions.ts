import { setToast } from "@src/App/Features/Layout";
import { store } from "@src/App/Store";

export const openToast = ({
  message = "",
  type = "success",
}: {
  message: string;
  type?: "info" | "error" | "success" | "warning";
}) => {
  store.dispatch(setToast({ open: true, message, severity: type }));
};
