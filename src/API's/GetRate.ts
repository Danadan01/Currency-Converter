import { Options } from "../Interfaces/options";

type Rate = number | undefined;

export const getRate = async (from: string, to: string): Promise<Rate> => {
  const options: Options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a3f8db5cbdmsh83dacc5304c5e56p1e9befjsne0e21de10053",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  const rateUrl: string = `https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=${to}&q=1.0`;
  const errorDiv = document.querySelector(".error") as HTMLDivElement;
  try {
    if (!from || !to) {
      throw new Error("Please choose currency!");
    } else if (from === to) {
      return 1;
    } else {
      const res = await fetch(rateUrl, options);
      if (!res.ok) {
        throw new Error(`Something went wrong. Error status: ${res.status}`);
      } else {
        const data = await res.json();
        return data;
      }
    }
  } catch (error: any) {
    console.error(error);
    errorDiv.textContent = error;
  }
};
