import { useNavigate } from 'react-router-dom'
import React from 'react'

interface Props {
    modalOpen: boolean,
    setModalOpen: any,
    closeModal: () => void,
    children: JSX.Element,
    title?: string,
    width?: Number
}

const ModalContainer = ({ modalOpen, setModalOpen, closeModal, width = 65, title, children }: Props) => {

    return (
        
modalOpen ?
        <div className="popup z-[200] top-0 left-0 flex justify-center items-center fixed w-[100vw] min-h-[100vh]">
            <div className='bg-[#00000040] cursor-pointer absolute w-[100%] h-[100%]' onClick={() => {
                setModalOpen(false)
            }}></div>


            <div className={`rounded-[8px] min-w-[600px] bg-[#fff] relative w-[${width}%] overflow-hidden`}>
                <div className="header p-[20px]">
                    <h2 className='text-[1.25em] font-semibold'>{title}</h2>
                    <i className="bi bi-x-lg absolute right-[15px] top-[15px] cursor-pointer" onClick={() => closeModal()}></i>

                </div>

                <div className="content__box p-[60px] flex flex-col gap-[24px]">

                    {children}

                </div>

            </div>

        </div>
        : null

    )
}


export default ModalContainer