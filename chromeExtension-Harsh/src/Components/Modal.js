import React from 'react';
import { X } from 'react-feather';
import Draggable from 'react-draggable';
import { ModalContext } from '../Contexts/ModalProvider';

const Modal = () => {
  const SourceCode = () => {
    // var request = request.defaults({jar: true})
    console.log(document.getElementsByTagName("input").value)
    // console.log(request)
  }
  return (
    <ModalContext.Consumer>
      {({ windowPosition, hasDraggedWindowPosition, extensionId, getExtensionId }) => (
        <Draggable
          handle=".modal-handle"
          defaultPosition={{x: windowPosition.x, y: windowPosition.y}}
          position={hasDraggedWindowPosition ? { x: windowPosition.x, y: windowPosition.y } : null}
        >
          <div id="modal" className="modal-window" style={{
            transform: windowPosition,
        }}>
            <div className="modal-window-inner-border">
                <>
                  <div className="modal-body">
                    <div className="modal-handle">
                      <div className="modal-close-button">
                        <X color="#5d6484" size="14" />
                      </div>
                    </div>
                    <div className="modal-content">
                      <h3>{extensionId}</h3>
                      <button
                        onClick={getExtensionId}
                        className="modal-button"
                      >
                      Get Extension ID
                      </button>
                      <button
                      onClick={SourceCode } 
                        className="modal-button"
                      >
                        Get Source Code
                      </button>
                    </div>
                  </div>
                </>
              </div>
          </div>
        </Draggable>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;
