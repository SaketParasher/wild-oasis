import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {

    // number of bookings
    const numBookings = bookings.length;

    // total sales 
    const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

    const checkins = confirmedStays.length;

    // total occupation rate = num checked in nights / total nights available (num of days * num of cabins)
    const occupation = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * cabinCount);


    return (
        <>
            <Stat color='blue' icon={<HiOutlineBriefcase />} title='Bookings' value={numBookings} />
            <Stat color='green' icon={<HiOutlineBanknotes />} title='Sales' value={formatCurrency(sales)} />
            <Stat color='indigo' icon={<HiOutlineCalendarDays />} title='Check ins' value={checkins} />
            <Stat color='yellow' icon={<HiOutlineChartBar />} title='Occupancy rate' value={`${Math.round(occupation * 100)}%`} />
        </>
    )
}

export default Stats