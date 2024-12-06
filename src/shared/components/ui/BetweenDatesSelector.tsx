import { DatePicker, DateValue } from '@nextui-org/react';
import { useState } from 'react';

interface BetweenDatesSelectorProps {
  dateFrom: DateValue | undefined,
  dateTo: DateValue | undefined,
  setDateFrom: React.Dispatch<React.SetStateAction<DateValue | undefined>>,
  setDateTo: React.Dispatch<React.SetStateAction<DateValue | undefined>>
}

export function BetweenDatesSelector({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo
}: BetweenDatesSelectorProps) {

  const [isInvalidDateFrom, setIsInvalidDateFrom] = useState<boolean>(false)
  const [isInvalidDateTo, setIsInvalidDateTo] = useState<boolean>(false)

  const validateDateFrom = (date: DateValue) => {
    if(dateTo == undefined || date <= dateTo) {
      setDateFrom(date)
      setIsInvalidDateFrom(false)
      return;
    }
    
    if(date > dateTo) {
      setIsInvalidDateFrom(true)
    }
  }

  const validateDateTo = (dateTo: DateValue) => {
    if(dateFrom == undefined || dateTo > dateFrom) {
      setDateTo(dateTo)
      setIsInvalidDateTo(false)
      return;
    }

    if(dateTo < dateFrom) {
      setIsInvalidDateTo(true)
    }
  }

  return (
    <div className={"flex gap-6 p-2"}>
      <div>
        <DatePicker 
          value={dateFrom} 
          onChange={(value) => validateDateFrom(value)} 
          label={'Date from'}
          isInvalid={isInvalidDateFrom}
          errorMessage={"Date from must be equal to or less than the date to"}
        />
      </div>
      <div>
        <DatePicker 
          value={dateTo} 
          onChange={validateDateTo} 
          label={'Date to'}
          isInvalid={isInvalidDateTo}
          errorMessage={"Date to must be greater than the date from"}
        />
      </div>
    </div>
  );
}
