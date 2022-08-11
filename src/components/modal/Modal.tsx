/**
 * External dependencies
 */
import { Fragment } from '@wordpress/element';
import { Dialog, Transition } from '@headlessui/react';

export interface IModal {
    /**
     * Modal opened or not
     */
    open: boolean | undefined;

    /**
     * Modal title.
     */
    title: string;

    /**
     * Modal size.
     */
    size?: 'small' | 'medium' | 'large' | 'extra-large' | undefined;

    /**
     * Toggle modal open or close.
     */
    setOpen(value: boolean): void;

    /**
     * Modal content.
     */
    children: JSX.Element;
}

const Modal = ({ open, setOpen, title, children, size }: IModal) => {
    const getSizeClassName = (sizeData: string) => {
        switch (sizeData) {
            case 'small':
                return 'sm:max-w-md';
            case 'medium':
                return 'sm:max-w-3xl';
            case 'large':
                return 'sm:max-w-4xl';
            case 'extra-large':
                return 'sm:max-w-[75%]';
            default:
                return 'sm:min-w-[30rem]';
        }
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-50 inset-0 overflow-y-auto left-0 right-0"
                onClose={setOpen}
            >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                <div className="min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray bg-opacity-90 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className={`inline-block bg-white rounded text-left overflow-hidden shadow-xl transform transition-all align-middle w-full ${getSizeClassName(
                                typeof size === 'undefined' ? 'small' : size
                            )} z-50 overflow-y-auto mt-28 sm:mt-0`}
                        >
                            <div
                                className="absolute right-8 top-3 cursor-pointer"
                                onClick={() => setOpen(false)}
                            >
                                <span className="text-xl text-black font-semibold hover:text-red-600">
                                    &times;
                                </span>
                            </div>
                            <Dialog.Title
                                as="h3"
                                className="text-lg leading-6 font-medium text-black bg-gray-liter p-4"
                            >
                                {title}
                            </Dialog.Title>
                            <div className="bg-white px-6 py-2 pb-5">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <div className="mt-4">{children}</div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

Modal.defaultProps = {
    size: 'small',
};

export default Modal;
