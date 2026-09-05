import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from '../../ui/Heading';
import { useDarkMode } from '../../context/DarkMode.context';
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const SalesChart = ({ isAnimation = true, bookings, numDays }) => {

  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
    : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date()
  })

  const data = allDates.map(date => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings.filter(booking => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.totalPrice, 0),
      extrasSales: bookings.filter(booking => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extrasPrice, 0)
    }
  })


  return (
    <StyledSalesChart>
      <Heading as="h2">Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash; {format(allDates.at(-1), "MMM dd yyyy")}</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}>

          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="label" />
          <YAxis width="auto" unit="$" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fillOpacity={0.9}
            fill={colors.totalSales.fill}
            isAnimationActive={isAnimation}
            animationBegin={200}
            animationDuration={1300}
            name="Total Sales"
            unit="$" />

          <Area type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            fillOpacity={1}
            fill={colors.extrasSales.fill}
            isAnimationActive={isAnimation}
            animationBegin={400}
            animationDuration={1300}
            name="Extra Sales"
            unit="$" />

        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}

export default SalesChart
