/* eslint-disable react/prop-types */
import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-5px);
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

export default function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    description,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const isBusy = isDeleting || isCreating;

  const handleDuplicate = () => {
    let filteredName = name;
    if (name.startsWith("Copy of")) {
      filteredName = name.replace("Copy of ", "");
    }

    createCabin({
      name: `Copy of ${filteredName}`,
      description,
      maxCapacity,
      regularPrice,
      discount,
      image,
    });
  };

  return (
    <Table.Row>
      <Img src={image} alt={description} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={() => handleDuplicate()}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isBusy}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}
