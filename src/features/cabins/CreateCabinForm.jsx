import styled from "styled-components";
import { useForm } from 'react-hook-form';

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useCreateUpdateCabin } from "./useCreateUpdateCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ onMutationComplete, cabinToEdit = {}, setShowEditForm }) {
  // cabin data to prefill in form in case of edit
  const { id: cabinId, ...cabinEditData } = cabinToEdit;
  const isEditMode = Boolean(cabinId);

  const { createUpdateCabinAction, isInserting } = useCreateUpdateCabin(isEditMode, cabinId, onMutationComplete, setShowEditForm);

  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
    defaultValues: cabinToEdit || {}
  });

  const onCabinsSubmit = (data) => {

    if (!isEditMode) {
      createUpdateCabinAction({ ...data, image: data.image[0] }, {
        onSuccess: () => {
          reset();
        }
      });
    } else {
      const imageData = typeof data.image === "string" ? data.image : data.image[0];
      createUpdateCabinAction({ ...data, image: imageData }, cabinId)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onCabinsSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name", {
          required: "cabin name is required !"
        })} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "maxcapacity is required",
          min: {
            value: 1,
            message: "min 1 guest required !"
          }
        })} />
        {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "regular price is required",
          min: {
            value: 10,
            message: "Regular price should be greater the $10"
          }
        })} />
        {errors?.regularPrice?.message && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "discount is required !",
          validate: (value) => Number(value) <= Number(getValues().regularPrice) || "Discount can't be greater than regular price"
        })} />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" defaultValue="" {...register("description", {
          required: "Description is required!"
        })} />
        {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*"
          type="file"
          {...register("image", { required: !isEditMode ? "Image is required!" : false })}
        />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isInserting}> {isEditMode ? 'Edit Cabin' : 'Create Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
