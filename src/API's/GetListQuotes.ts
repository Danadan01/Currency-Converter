import { Options } from "../Interfaces/options";

type Currencies = string[] | undefined;

export const getListQuotes = async (): Promise<Currencies> => {
  const options: Options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a3f8db5cbdmsh83dacc5304c5e56p1e9befjsne0e21de10053",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  const listQuotesUrl: string =
    "https://currency-exchange.p.rapidapi.com/listquotes";
  try {
    const res = await fetch(listQuotesUrl, options);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error(`Something went wrong. Error status: ${res.status}`);
    }
  } catch (error: any) {
    console.error(error);
    const errorDiv = document.querySelector(".error") as HTMLDivElement;
    errorDiv.textContent = error;
  }
};
