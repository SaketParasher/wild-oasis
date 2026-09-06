
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { useGetCabins } from "./useGetCabins";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {

  const [searchParams] = useSearchParams();
  let filteredCabins;
  let sortedCabins;
  const filterQuery = searchParams.get('discount') || 'all';
  const sortQuery = searchParams.get('sortBy') || 'regularPrice-asc';
  const [fieldToSort, direction] = sortQuery.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  const { cabins, isLoading } = useGetCabins();

  // FILTERING
  if (filterQuery === 'no-discount') {
    filteredCabins = cabins?.filter(cabin => cabin.discount === 0)
  } else if (filterQuery === 'with-discount') {
    filteredCabins = cabins?.filter(cabin => cabin.discount > 0)
  } else {
    filteredCabins = cabins
  }

  // SORTING
  sortedCabins = filteredCabins?.sort((a, b) => {
    const valueA = a[fieldToSort];
    const valueB = b[fieldToSort];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB) * modifier;
    }

    return (valueA - valueB) * modifier;
  })


  if (isLoading) return <Spinner />

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin) => <CabinRow
          cabin={cabin}
          key={cabin.id}
        />} />
      </Table>
    </Menus>
  )
}

export default CabinTable;
