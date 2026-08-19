import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {

  const [showForm, setShowForm] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);

  function handleMutationComplete() {
    setShouldScroll(true);
  }

  return (
    <>
      <Row>
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row type="vertical">
        <CabinTable shouldScroll={shouldScroll} setShouldScroll={setShouldScroll} />
        <Button onClick={() => setShowForm(prev => !prev)}>Add New Cabin</Button>
        {showForm && <CreateCabinForm onMutationComplete={handleMutationComplete} />}
      </Row>
    </>
  );
}

export default Cabins;
