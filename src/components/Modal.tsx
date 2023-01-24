import { useEffect, useRef, useState } from "react"

type ModalProps = {
    isOpen?: boolean
    closeModal: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen = false, closeModal, children }) => {
    const [lastFocused, setLastFocused] = useState(document.activeElement)
    const closeButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        // We want to keep track of the focused element and return focus to it on modal close
        if (isOpen) {
            setLastFocused(document.activeElement)
            closeButtonRef.current?.focus()
        } else {
            (lastFocused as HTMLElement)?.focus()
        }
    }, [isOpen])

    return (
        <>
            {/* overlay */}
            <div className={`fixed top-0 left-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50 h-full w-full ${isOpen ? '' : 'hidden'}`}>
                <div className="relative mx-auto py-6 px-10 border w-11/12 md:w-4/5 lg:w-3/5 max-w-xl shadow-lg  rounded-lg bg-white">
                    {/* close button */}
                    <div className="absolute top-3 right-3 p-1">
                        <button ref={closeButtonRef} onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                            <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    {/* body */}
                    <div className="py-5">{children}</div>
                </div>
            </div>
        </>
    )
}

export default Modal