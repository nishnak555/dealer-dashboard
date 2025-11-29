import rawData from "../data/dealers.json";
import type { DealerFormValues } from "../interfaces/dealer.interface";

const STORAGE_KEY = "dealers_data";

// Convert JSON to typed array
const dealersJson = rawData as DealerFormValues[];

export const getDealers = (): DealerFormValues[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : dealersJson;
};

export const createDealer = async (dealer: DealerFormValues) => {
  const all = getDealers();
  const updated = [...all, dealer];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updated;
};


export const getDealerById = (id: number): DealerFormValues | undefined => {
  const all = getDealers();
  return all.find((d) => d.id === id);
};

export const updateDealer = (updated: DealerFormValues) => {
  const all = getDealers();
  const newList = all.map((d) => (d.id === updated.id ? updated : d));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
};


export const saveDealers = (list: DealerFormValues[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};
export const deleteDealer = (id: number) => {
  const all = getDealers();
  const updated = all.filter((d) => d.id !== id);
  saveDealers(updated);
  return updated;
};