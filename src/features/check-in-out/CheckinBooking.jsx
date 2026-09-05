import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import { useGetSettings } from "../settings/useGetSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isPaid, setIsPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { booking = {}, isLoading } = useGetBooking();
  const { isLoading: settingsLoading, settings = {} } = useGetSettings();

  const {
    id: bookingId,
    guests,
    guestId,
    cabinId,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const { breakfastPrice } = settings;

  const { updatebookingAction } = useCheckIn()

  // if ispaid is true then set the isPaid state to true so that checkbox will be checked by default
  useEffect(() => {
    if (booking.isPaid) {
      setIsPaid(true)
    }
  }, [booking])

  function handleCheckin() {
    if (!addBreakfast) {
      updatebookingAction({ bookingId, breakfast: {} })
    } else {
      updatebookingAction({
        bookingId, breakfast: {
          hasBreakfast: true,
          extrasPrice: numGuests * numNights * breakfastPrice
        }
      })
    }
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
        <Checkbox
          id={`${guestId}-${cabinId}-${bookingId}`}
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast(prev => !prev)
            setIsPaid(false)
          }}
        >
          Include Breakfast for {formatCurrency(numGuests * numNights * breakfastPrice)}
          ({numGuests} Guests * {numNights} Nights * {formatCurrency(breakfastPrice)}/meal)?
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox
          id={`${bookingId}-${guestId}-${cabinId}`}
          checked={isPaid}
          disabled={isPaid}
          onChange={() => setIsPaid(prev => !prev)}>
          I have paid the booking amount {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(numGuests * numNights * breakfastPrice + totalPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(numGuests * numNights * breakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isPaid}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
