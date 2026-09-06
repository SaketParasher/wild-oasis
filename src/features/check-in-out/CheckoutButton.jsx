import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { updatebookingAction, isPending } = useCheckOut();
  return (
    <Button variation="danger" size="small" onClick={() => updatebookingAction({ bookingId })} disabled={isPending}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
