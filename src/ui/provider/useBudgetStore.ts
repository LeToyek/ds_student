import { create } from "zustand";
import { BudgetStore } from "../model/budget";
import { Registrant, RegistrantBudget } from "../model/registrant";

export const useBudgetStore = create<BudgetStore>((set) => ({
  baseBudget: 500000,
  saranaPercentage: 0.2,
  prasaranaPercentage: 0.35,
  sdmPercentage: 0.45,
  totalBudget: 0,
  registrants: [],
  registrantBudget: [],
  saranaBudget: 0,
  prasaranaBudget: 0,
  sdmBudget: 0,
  setAttribute: (registrants: Registrant[]) => {
    set((state) => {
      const tempRegistrantBudget: RegistrantBudget[] = [];
      let totalBudget = 0;
      registrants.forEach((registrant) => {
        const yearBudget =
          state.baseBudget * (registrant.sma + registrant.ma + registrant.smk);
        const registrantBudget: RegistrantBudget = {
          year: registrant.year,
          sma: registrant.sma * state.baseBudget,
          ma: registrant.ma * state.baseBudget,
          smk: registrant.smk * state.baseBudget,
          yearBudget: yearBudget,
          saranaBudget: yearBudget * state.saranaPercentage,
          prasaranaBudget: yearBudget * state.prasaranaPercentage,
          sdmBudget: yearBudget * state.sdmPercentage,
        };
        tempRegistrantBudget.push(registrantBudget);
        totalBudget += registrantBudget.yearBudget;
      });
      return {
        registrants,
        registrantBudget: tempRegistrantBudget,
        totalBudget,
      };

    });
  },
  setNewBaseBudget: (newBaseBudget: number) => {
    set((state) => {
      state.baseBudget = newBaseBudget;
      state.totalBudget = 0;
      state.registrantBudget = [];
      state.registrants.forEach((registrant) => {
        const yearBudget =
          state.baseBudget * (registrant.sma + registrant.ma + registrant.smk);
        const registrantBudget: RegistrantBudget = {
          year: registrant.year,
          sma: registrant.sma * state.baseBudget,
          ma: registrant.ma * state.baseBudget,
          smk: registrant.smk * state.baseBudget,
          yearBudget: yearBudget,
          saranaBudget: yearBudget * state.saranaPercentage,
          prasaranaBudget: yearBudget * state.prasaranaPercentage,
          sdmBudget: yearBudget * state.sdmPercentage,
        };
        state.registrantBudget.push(registrantBudget);
        state.totalBudget += registrantBudget.yearBudget;
      });
    });
  },
  setNewSaranaPercentage: (newSaranaPercentage: number) => {
    set((state) => {
      state.saranaPercentage = newSaranaPercentage;
      state.totalBudget = 0;
      state.registrantBudget = [];
      state.registrants.forEach((registrant) => {
        const yearBudget =
          state.baseBudget * (registrant.sma + registrant.ma + registrant.smk);
        const registrantBudget: RegistrantBudget = {
          year: registrant.year,
          sma: registrant.sma * state.baseBudget,
          ma: registrant.ma * state.baseBudget,
          smk: registrant.smk * state.baseBudget,
          yearBudget: yearBudget,
          saranaBudget: yearBudget * state.saranaPercentage,
          prasaranaBudget: yearBudget * state.prasaranaPercentage,
          sdmBudget: yearBudget * state.sdmPercentage,
        };
        state.registrantBudget.push(registrantBudget);
        state.totalBudget += registrantBudget.yearBudget;
      });
    });
  },

  setNewPrasaranaPercentage: (newPrasaranaPercentage: number) => {
    set((state) => {
      state.prasaranaPercentage = newPrasaranaPercentage;
      state.totalBudget = 0;
      state.registrantBudget = [];
      state.registrants.forEach((registrant) => {
        const yearBudget =
          state.baseBudget * (registrant.sma + registrant.ma + registrant.smk);
        const registrantBudget: RegistrantBudget = {
          year: registrant.year,
          sma: registrant.sma * state.baseBudget,
          ma: registrant.ma * state.baseBudget,
          smk: registrant.smk * state.baseBudget,
          yearBudget: yearBudget,
          saranaBudget: yearBudget * state.saranaPercentage,
          prasaranaBudget: yearBudget * state.prasaranaPercentage,
          sdmBudget: yearBudget * state.sdmPercentage,
        };
        state.registrantBudget.push(registrantBudget);
        state.totalBudget += registrantBudget.yearBudget;
      });
    });
  },

  setNewSdmPercentage: (newSdmPercentage: number) => {
    set((state) => {
      state.sdmPercentage = newSdmPercentage;
      state.totalBudget = 0;
      state.registrantBudget = [];
      state.registrants.forEach((registrant) => {
        const yearBudget =
          state.baseBudget * (registrant.sma + registrant.ma + registrant.smk);
        const registrantBudget: RegistrantBudget = {
          year: registrant.year,
          sma: registrant.sma * state.baseBudget,
          ma: registrant.ma * state.baseBudget,
          smk: registrant.smk * state.baseBudget,
          yearBudget: yearBudget,
          saranaBudget: yearBudget * state.saranaPercentage,
          prasaranaBudget: yearBudget * state.prasaranaPercentage,
          sdmBudget: yearBudget * state.sdmPercentage,
        };
        state.registrantBudget.push(registrantBudget);
        state.totalBudget += registrantBudget.yearBudget;
      });
    });
  },
}));
