'use client';

import { FC } from "react";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  totalPrice: number;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates?: Date[];
}

const ListingReservation: FC<ListingReservationProps> = ({
  price,
  onChangeDate,
  dateRange,
  totalPrice,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border-[1px] border-neutral-200 dark:border-gray-800 overflow-hidden">
        <div className="flex flex-row items-center gap-1 p-4">
            <div className="text-2xl font-semibold">$ {price}</div>
            <div className="font-light text-neutral-600 dark:text-neutral-400">night</div>
        </div>
        <hr />
        <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)}/>
        <hr />
        <div className="p-4">
            <Button disabled={disabled} label="Reserve" onClick={onSubmit}/>
        </div>
        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
            <div className="">Total</div>
            <div className="">$ {totalPrice}</div>
        </div>
    </div>
  );
};

export default ListingReservation;
