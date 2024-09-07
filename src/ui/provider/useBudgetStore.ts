import { create } from "zustand";
import { BaseBudget, BaseTotalBudget, BudgetStore, Registrants } from "../model/budget";

export const useBudgetStore = create<BudgetStore>((set) => ({
  baseTotalBudgets: [],
  totalBudget: 0,
  saranaPercentage: 0.2,
  prasaranaPercentage: 0.35,
  sdmPercentage: 0.45,
  registrants:{},
  setRegistrants: (newRegistrants: Registrants) => {
    set(() => {
      return {
        registrants: newRegistrants,
      };
    });
  },
  setAttribute: (newBaseBudgets: BaseBudget[]) => {
    set(() => {
      const tempBaseBudgets: BaseTotalBudget[] = [];

      let totalBudget = 0;
      newBaseBudgets.forEach((budget) => {
        const yearBudget =
          budget.spp +
          budget.heregistrasi +
          budget.dpp +
          budget.ospek +
          budget.utsuas;
        const baseTotalBudget: BaseTotalBudget = {
          baseBudget: budget,
          totalBudget: yearBudget,
        };
        tempBaseBudgets.push(baseTotalBudget);
        totalBudget += yearBudget;
      });
      return {
        baseTotalBudgets: tempBaseBudgets,
        totalBudget,
      };
    });
  },
  setNewSaranaPercentage: (newSaranaPercentage: number) => {
    set(() => {
      return {
        saranaPercentage: newSaranaPercentage,
      };
    });
  },
  setNewPrasaranaPercentage: (newPrasaranaPercentage: number) => {
    set(() => {
      return {
        prasaranaPercentage: newPrasaranaPercentage,
      };
    });
  },
  setNewSdmPercentage: (newSdmPercentage: number) => {
    set(() => {
      return {
        sdmPercentage: newSdmPercentage,
      };
    });
  },
}));
