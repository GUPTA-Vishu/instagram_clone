import React from 'react'
import "./Modal.css";




const Modal = ({setModalOpen}) => {
   
    
    
  return (
    <div className='modal'>
        <div className="modalHeader">
            <h5 className='heading'>Are you sure you want to logout</h5>
            <button className='cross-button' >X</button>
        </div>
        <div className="modalActions">
            <button className='logoutBtn' 
             >Logout</button>
            <button className='cancelBtn' >Cancel</button>
        </div>
      
    </div>
  )
}

export default Modal
