/* eslint-disable react/prop-types */
// import React from 'react'
import closeIcon from '../assets/x-solid.svg';

const Modal = ({onClose, children}) => {
  return (
    <>
   <div className="modal-overlay">
      <div
        className="card bg-white py-8 px-8"
        style={{ width: '550px', height: '450px' }}
      >
        {/* Close Button */}
        <div className="flex justify-end w-6 h-6" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </div>
        
        {/* Modal Content */}
        <div className="card-body py-6">
          
          {/* Slot Replacement */}
          <div>{children}</div>
          
          {/* Continue Button */}
        </div>
      </div>
    </div>
    </>
  )
}

export default Modal