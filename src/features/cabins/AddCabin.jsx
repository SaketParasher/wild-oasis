import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsModalOpen(prev => !prev)}>Add New Cabin</Button>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <CreateCabinForm onModalClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </>
    )
}

export default AddCabin;