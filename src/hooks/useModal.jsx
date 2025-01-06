// import { useState } from "react"
// import { fetchBook } from "../api/booksApi";

import { useState } from "react";


// const useModal = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [modalType, setModalType] = useState('');
//     // const [moduleType, setModuleType] = useState('');
//     const [selectedData, setSelectedData] = useState(null);

//     const fetchData = async (module, id) => {
//         let response;
//         switch(module) {
//             case 'book':
//                 response = await fetchBook(id);
//                 break;
//             case 'user':
//                 response = await fetchBook(id);
//                 break;
//             default: 
//             console.warn(`No fetch function found for module: ${module}`);
//             return;
//         }
//         setSelectedData(response);
//     }

//     const openModal = (modal, module, id) => {
//         setModalType(modal);
//         setIsOpen(true);
//         fetchData(module, id)
//     }

//     const closeModal = () => {
//         setIsOpen(false);
//         setSelectedData(null);
//     }

//     return {
//         isOpen,
//         modalType,
//         selectedData,
//         openModal,
//         closeModal
//     }
// }

// export default useModal;



const useModal = () => {
    const [id, setId] = useState(null);
    const [action, setAction] = useState(null);
    const [openModal, setOpenModal] = useState(null);

    const handleOpenModal = (action, id) => {
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