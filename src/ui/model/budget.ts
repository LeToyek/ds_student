export type BudgetStore = {
  saranaPercentage: number;
  prasaranaPercentage: number;
  sdmPercentage: number;
  totalBudget: number;
  baseTotalBudgets: BaseTotalBudget[];
  registrants:Registrants,
  setRegistrants: (newRegistrants: Registrants) => void;
  setAttribute: (newBaseBudgets: BaseBudget[]) => void;
  setNewSaranaPercentage: (newSaranaPercentage: number) => void;
  setNewPrasaranaPercentage: (newPrasaranaPercentage: number) => void;
  setNewSdmPercentage: (newSdmPercentage: number) => void;

};
export type Registrants = {
  [year:number]:number
}
export type BaseBudget = {
  spp: number;
  heregistrasi: number;
  dpp: number;
  ospek: number;
  utsuas: number;
  year: number;
};
export type BaseTotalBudget = {
  baseBudget: BaseBudget;
  totalBudget: number;
};

