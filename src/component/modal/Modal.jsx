import React,{useState} from 'react';
import './Modal.css'; // Make sure to import your CSS file

export const Modal = () => {
    const [modalOpen,setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="modal-example">
            <h2>Modal Example</h2>

            {/* Trigger/Open The Modal */}
            <button onClick={openModal}>Open Modal</button>

            {/* The Modal */}
            {modalOpen && (
                <div className="modal">
                    {/* Modal Content */}
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>Some text in the Modal..</p>
                    </div>
                </div>
            )}

        </div>
    );
};

