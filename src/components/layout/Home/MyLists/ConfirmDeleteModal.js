import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useClickOutside } from 'react-click-outside-hook'

import './../../../../bootstrap/bootstrap-5.0.1-dist/css/bootstrap.min.css';
import './List.css'

const ConfirmDeleteModal = ({isOpen, onClose, listName}) => {
   

    
    
    if(isOpen)
    return(
        <>
        
        <div className="page-mask">
           
            <Modal.Dialog>
        <Modal.Header>
            <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Are you sure you want to delete '{listName}'' list?</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button variant="danger">Delete</Button>
        </Modal.Footer>
        </Modal.Dialog>
        </div>
        </>)
        else
        return null
}

export default ConfirmDeleteModal
