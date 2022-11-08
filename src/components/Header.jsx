import React, {useState} from 'react'
import Modal from './modal'

const Header = () => {
  const [modalOn, setModalOn] = useState(false)
  const handleModal = () => {
    setModalOn(true)
  }

  return (
    <div>
<button onClick={handleModal}>모달켜기</button>
{modalOn && <Modal setModalOn={setModalOn} />}
  </div>
  )
}

export default Header