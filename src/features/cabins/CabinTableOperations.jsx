import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";

function CabinTableOperations() {

    return (
        <TableOperations>
            <Filter filterKey="discount" filterValueOptions={[
                { value: 'all', label: 'All' },
                { value: 'no-discount', label: 'No Discount' },
                { value: 'with-discount', label: 'With Discount' }
            ]} />

            <Sort options={[
                { value: "regularPrice-asc", label: "Price(Low to High)" },
                { value: "regularPrice-dsc", label: "Price(High to Low)" },
                { value: "maxCapacity-asc", label: "Capacity(Low to High)" },
                { value: "maxCapacity-dsc", label: "Capacity(High to Low)" },
                { value: "name-asc", label: "Cabins(A to Z)" },
                { value: "name-dsc", label: "Cabins(Z to A)" }
            ]} />
        </TableOperations>
    )
}

export default CabinTableOperations;