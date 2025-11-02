import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function Elektronikamodal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        className="bg-white border-2 border-amber-200"
        onClick={handleShow}
      >
        Zistit viac
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="flex gap-2">
            <img src="/assets/sutaze/ELEKTRONIKA.png" className="h h-9" />
            <p className="font-bold text-3xl">ELEKTRONIKA</p>
          </div>

          <div className="mt-3">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
              saepe quibusdam cupiditate nihil deleniti eveniet beatae, eum
              quidem animi voluptatibus corporis minima architecto facere culpa
              ipsum perspiciatis expedita laboriosam ullam!
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border-2 border-sky-400 rounded-md bg-sky-200">
              <p>Začiatok kola</p>
              <p></p>
            </div>

            <div className="border-2 border-green-400 rounded-md bg-green-300">
              <p>velkost timu</p>
              <p>1-4 členovia</p>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="bg-white border-2 border-black rounded-sm"
            onClick={handleClose}
          >
            Zatvoriť
          </button>
          <Link to="/register">
            <button
              className="bg-blend-color bg-amber-200 "
              onClick={handleClose}
            >
              Zaregistrovať sa
            </button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Elektronikamodal;
