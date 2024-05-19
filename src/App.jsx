import { useState } from 'react';
import Modal from './Modal';
import './App.css';

function App() {
  const [open, setOpen] = useState(false);

  const modalBtnClickHandler = () => {
    setOpen(true);
  };

  const closeModalHandler = () => {
    setOpen(false);
  };

  // implementation WITHOUT animation

  // return (
  //   <div className="container">
  //     <div className="App">
  //       <button
  //         className="open-modal-btn"
  //         onClick={() => {
  //           modalBtnClickHandler();
  //         }}
  //       >
  //         ✨ Открыть окно
  //       </button>
  //       {open ? <Modal clickHandler={closeModalHandler} /> : null}
  //     </div>
  //   </div>
  // );

  // implementation WITH animation
  const modalClassName = `animated ${open ? 'show' : ''}`;
  return (
    <div className="container">
      <div className="App">
        <button
          className="open-modal-btn"
          onClick={() => {
            modalBtnClickHandler();
          }}
        >
          ✨ Открыть окно
        </button>
        <Modal
          clickHandler={closeModalHandler}
          className={modalClassName}
          title="this is modal pop up"
        >
          <img
            src="https://c.tenor.com/AG66DscMTg0AAAAd/tenor.gif"
            alt="Robin Williams speaking wazzuuuuup!"
          />
        </Modal>
      </div>
    </div>
  );

  //  how to close by clicking outside the window
  // https://www.dhiwise.com/post/the-ultimate-guide-to-react-click-outside-modal-to-close

  // how to close modal by pressing ESC key
  // https://keyholesoftware.com/cancel-a-react-modal-with-escape-key-or-external-click/
}

export default App;
