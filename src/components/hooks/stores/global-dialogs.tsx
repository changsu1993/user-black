import { create } from "zustand";

type LoginDialogState = {
  open: boolean;
  data?: any;
};

type GlobalDialogsStore = {
  loginDialog?: LoginDialogState;
  setLoginDialog: (value: LoginDialogState | boolean) => void;
};

const useGlobalDialogs = create<GlobalDialogsStore>()((setState) => ({
  loginDialog: {
    open: false,
  },
  setLoginDialog(value) {
    setState((state) => ({
      ...state,
      ...(typeof value === "boolean"
        ? { loginDialog: { open: value } }
        : { loginDialog: value }),
    }));
  },
}));

export default useGlobalDialogs;
