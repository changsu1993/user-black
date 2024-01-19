import { create } from "zustand";

type AlertData = {
  heading?: string;
  content?: string;
  buttonTxt?: string;
};

type AlertDialogsStore = {
  alertDialogOpen: boolean;
  alertData: AlertData;
  showAlertDialog: (value: AlertData) => void;
  closeAlertDialog: () => void;
  setAlertDialogOpen: (value: boolean) => void;
};

const useAlertDialog = create<AlertDialogsStore>()((setState) => ({
  alertDialogOpen: false,
  alertData: {
    buttonTxt: "확인",
  },
  showAlertDialog(value) {
    setState((state) => ({
      alertData: {
        buttonTxt: value.buttonTxt
          ? value.buttonTxt
          : state.alertData?.buttonTxt,
        content: value.content,
        heading: value.heading,
      },
      alertDialogOpen: true,
    }));
  },
  closeAlertDialog() {
    setState((state) => ({
      ...state,
      alertData: {
        buttonTxt: state.alertData.buttonTxt,
        content: undefined,
        heading: undefined,
      },
      alertDialogOpen: false,
    }));
  },
  setAlertDialogOpen(value) {
    setState((state) => ({
      ...state,
      alertData: {
        buttonTxt: state.alertData.buttonTxt,
        content: undefined,
        heading: undefined,
      },
      alertDialogOpen: value,
    }));
  },
}));

export default useAlertDialog;
