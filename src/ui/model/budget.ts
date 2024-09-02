import { Registrant, RegistrantBudget } from "./registrant";

export type BudgetStore = {
  baseBudget: number;
  saranaPercentage: number;
  prasaranaPercentage: number;
  sdmPercentage: number;
  totalBudget: number;
  registrants: Registrant[];
  registrantBudget: RegistrantBudget[];
  setAttribute: (registrants: Registrant[]) => void;
  setNewBaseBudget: (newBaseBudget: number) => void;
  setNewSaranaPercentage: (newSaranaPercentage: number) => void;
  setNewPrasaranaPercentage: (newPrasaranaPercentage: number) => void;
  setNewSdmPercentage: (newSdmPercentage: number) => void;

};

