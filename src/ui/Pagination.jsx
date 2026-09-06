import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { RESULTS_PER_PAGE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Pagination = ({ totalResults }) => {


  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const resultStarts = (RESULTS_PER_PAGE * (page - 1)) + 1;
  const resultsUpto = (RESULTS_PER_PAGE * page) < totalResults ? (RESULTS_PER_PAGE * page) : totalResults;

  const handlePreviousClick = () => {
    const currentPage = page === 1 ? page : page - 1;
    searchParams.set("page", currentPage);
    setSearchParams(searchParams);
  }

  const handleNextClick = () => {
    const currentPage = page === Math.ceil(totalResults / RESULTS_PER_PAGE) ? page : page + 1;
    searchParams.set("page", currentPage);
    setSearchParams(searchParams);
  }

  if (totalResults < RESULTS_PER_PAGE) return null;

  return (
    <StyledPagination>
      <P>Showing <span>{resultStarts}</span> to <span>{resultsUpto}</span> results, out of <span>{totalResults}</span></P>
      <Buttons>
        <PaginationButton onClick={handlePreviousClick} disabled={page === 1}>
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={handleNextClick} disabled={page === Math.ceil(totalResults / RESULTS_PER_PAGE)}>
          <span>Next </span><HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  )
}

export default Pagination;
