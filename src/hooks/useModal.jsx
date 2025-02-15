import { useState } from "react";

const useModal = () => {
    const [id, setId] = useState(null);
    const [action, setAction] = useState(null);
    const [openModal, setOpenModal] = useState(null);

    const handleOpenModal = (action, id) => {
        console.log(id)
        setId(id);
        setAction(action);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return {
        id,
        action,
        openModal,
        handleOpenModal,
        handleCloseModal
    }

}


export default useModal;