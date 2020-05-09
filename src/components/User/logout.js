import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Modal from 'react-modal';

import * as modalConstants from '../../constants/modal';

Modal.setAppElement('#root')

export default function Logout() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  const logout = () => {
    // localStorage.removeItem('token')
    history.push('/') // back to login page
  }
  
  return (
    <div>
      <button onClick={openModal}>Logout</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalConstants.logoutModal}
      >
        <button onClick={logout}>ログアウトします</button>
        <button onClick={closeModal}>戻る</button>
      </Modal>
    </div>
  )
}
