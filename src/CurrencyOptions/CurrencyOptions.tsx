import { useEffect, useState } from "react";
import { getListQuotes } from "../API's/GetListQuotes";

type setCurrencyFuncType = { 
  setCurrency: (a: string) => void
};

export const CurrencyOptions = ({setCurrency}: setCurrencyFuncType) => {
  const [list, setList] = useState<string[] | undefined>([]);

  const getSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    setCurrency(target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const newList = await getListQuotes();
      setList(newList);
    }

    fetchData();
  }, [])

  const optionList = list?.map((el, i) => <option key={i} value={el}>{el}</option>) 
  
  return (
    <div>
      <select name="currencies" id="currenciesSelect" onChange={getSelect}>
      <option value="">--Please choose an option--</option>
      {optionList}
      </select>
    </div>
  )
}