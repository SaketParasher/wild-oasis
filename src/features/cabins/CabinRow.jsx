import { forwardRef, useState } from "react";
import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from "./useDeleteCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;


// CabinRow uses forWard ref to get the ref of last cabin row
const CabinRow = function CabinRow({ cabin }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { id: cabinId, name, maxCapacity, regularPrice, discount, image } = cabin;

  // import deleteCabinAction mutation function from useDeleteCabin hook
  const { isDeleting, deleteCabinAction } = useDeleteCabin();

  return (
    <>
      <Table.Row>
        <Img src={image} alt={`${name} image`} />
        <Cabin>{name}</Cabin>
        <div>Max Capacity {maxCapacity} Persons</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount}</Discount>
        {/* <div>
          <button title="duplicate"></button>
          <button title="edit" onClick={() => setShowEditForm(prev => !prev)}><HiPencil /></button>
          <button title="delete" onClick={() => setShowDeleteModal(true)}><HiTrash /></button>
        </div> */}
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />}>Duplicate</Menus.Button>
            <Menus.Button icon={<HiPencil />} handleClick={() => setShowEditForm(true)}>Edit</Menus.Button>
            <Menus.Button icon={<HiTrash />} handleClick={() => setShowDeleteModal(true)}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Table.Row>
      {showEditForm && <Modal onClose={() => setShowEditForm(false)}>
        <CreateCabinForm cabinToEdit={cabin} onModalClose={() => setShowEditForm(false)} />
      </Modal>}

      {showDeleteModal && <Modal onClose={() => setShowDeleteModal(false)}>
        <ConfirmDelete resourceName="Cabin"
          onConfirm={() => deleteCabinAction(cabinId)}
          disabled={isDeleting}
          cancelDelete={() => setShowDeleteModal(false)} />
      </Modal>}
    </>
  )
}

export default CabinRow;