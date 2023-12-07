/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useState } from "react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const [showForm, setShowForm] = useState(false);

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

  const isBusy = isDeleting || isCreating;

  return (
    <>
      <TableRow>
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
          <button>
            <HiSquare2Stack
              onClick={() => handleDuplicate()}
              disabled={isBusy}
            />
          </button>
          <button onClick={() => setShowForm(!showForm)} disabled={isBusy}>
            <HiPencil />
          </button>
          <button onClick={() => deleteCabin(cabinId)} disabled={isBusy}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && (
        <CreateCabinForm cabinToEdit={cabin} formHandler={setShowForm} />
      )}
    </>
  );
}
