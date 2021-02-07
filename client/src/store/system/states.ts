// initial state
export type InitialStateType = {
    snackBar: {
        open: boolean;
        message: string;
    };
    modal: {
        open: boolean;
        message: string;
    };
};

export const initialState: InitialStateType = {
    snackBar: {
        open: false,
        message: '',
    },
    modal: {
        open: false,
        message: '',
    },
};
