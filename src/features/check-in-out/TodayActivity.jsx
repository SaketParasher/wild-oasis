import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
  overflow-y: scroll;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { isLoading, todayStays } = useTodayActivity();

  return (
    <StyledToday>
      <Row type="vertical">
        <Heading as="h2">Today</Heading>

        {isLoading ? <Spinner /> : todayStays?.length === 0 ?
          <NoActivity>No Activity Today...</NoActivity> : <TodayList>
            {todayStays.map(activity =>
              <TodayItem activity={activity} />
            )}</TodayList>}
        {/* {todayStays?.length === 0 && <NoActivity>No Activity Today...</NoActivity>} */}
        {/* {todayStays.map(activity => <TodayItem activity={activity} />)} */}

      </Row>
    </StyledToday>
  );
}

export default TodayActivity;
