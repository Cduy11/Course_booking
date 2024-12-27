import { useState } from "react";

const useOpen = () => {
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return { open, onClose, handleClickOpen };
};
export default useOpen;