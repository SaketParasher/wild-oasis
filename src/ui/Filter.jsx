import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;


const Filter = ({ filterKey, filterValueOptions }) => {

  // useSearchParams hook will be used set the filter in url , and then based on the "discount" url
  //  query params cabins will be filtered from the table
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilterQuery = searchParams.get(filterKey) || filterValueOptions[0].value
  const setCabinsFilterTerm = (filterTerm) => {
    searchParams.set(filterKey, filterTerm)
    if (searchParams.get('page')) searchParams.set('page', 1)
    setSearchParams(searchParams)
  }


  return (
    <StyledFilter>
      {filterValueOptions.map(option => <FilterButton
        onClick={() => setCabinsFilterTerm(option.value)}
        active={currentFilterQuery === option.value}>
        {option.label}
      </FilterButton>)}
    </StyledFilter>
  )
}

export default Filter