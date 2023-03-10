import React, {useState, createContext} from 'react'

export const ModalContext = createContext({})
const ModalContextProvider = ({ children }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false)
    const [openCreateForm, setOpenCreateForm] = useState(false)
    return (
        <ModalContext.Provider value={{openModal:openModal, setOpenModal:setOpenModal, openCreateForm, setOpenCreateForm, openEditForm, setOpenEditForm}}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider