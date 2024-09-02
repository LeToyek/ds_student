import { create } from "zustand";
import { BudgetStore } from "../model/budget";
import { Registrant, RegistrantBudget } from "../model/registrant";

export const useBudgetStore = create<BudgetStore>((set) => ({
  baseBudget: 500000,
  saranaPercentage: 0.20,
  prasaranaPercentage: 0.35,
  sdmPercentage: 0.45,
  totalBudget: 0,
  registrants: [],
  registrantBudget: [],
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
      const tempRegistrantBudget: RegistrantBudget[] = [];
      let totalBudget = 0;
      state.registrants.forEach((registrant) => {
        const yearBudget =
          newBaseBudget * (registrant.sma + registrant.ma + registrant.smk);
        const registrantBudget: RegistrantBudget = {
          year: registrant.year,
          sma: registrant.sma * newBaseBudget,
          ma: registrant.ma * newBaseBudget,
          smk: registrant.smk * newBaseBudget,
          yearBudget: yearBudget,
          saranaBudget: yearBudget * state.saranaPercentage,
          prasaranaBudget: yearBudget * state.prasaranaPercentage,
          sdmBudget: yearBudget * state.sdmPercentage,
        };
        tempRegistrantBudget.push(registrantBudget);
        totalBudget += registrantBudget.yearBudget;
      });
      return {
        baseBudget: newBaseBudget,
        registrantBudget: tempRegistrantBudget,
        totalBudget,
      };
    });
  },
  setNewSaranaPercentage: (newSaranaPercentage: number) => {
    set((state) => {
      const tempRegistrantBudget: RegistrantBudget[] = [];
      let totalBudget = 0;
      state.registrants.forEach((registrant) => {
        const yearBudget =
          state.baseBudget * (registrant.sma + registrant.ma + registrant.smk);
        const registrantBudget: RegistrantBudget = {
          year: registrant.year,
          sma: registrant.sma * state.baseBudget,
          ma: registrant.ma * state.baseBudget,
          smk: registrant.smk * state.baseBudget,
          yearBudget: yearBudget,
          saranaBudget: yearBudget * newSaranaPercentage,
          prasaranaBudget: yearBudget * state.prasaranaPercentage,
          sdmBudget: yearBudget * state.sdmPercentage,
        };
        tempRegistrantBudget.push(registrantBudget);
        totalBudget += registrantBudget.yearBudget;
      });
      return {
        saranaPercentage: newSaranaPercentage,
        registrantBudget: tempRegistrantBudget,
        totalBudget,
      };
    });
  },
  setNewPrasaranaPercentage: (newPrasaranaPercentage: number) => {
    set((state) => {
      const tempRegistrantBudget: RegistrantBudget[] = [];
      let totalBudget = 0;
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
          prasaranaBudget: yearBudget * newPrasaranaPercentage,
          sdmBudget: yearBudget * state.sdmPercentage,
        };
        tempRegistrantBudget.push(registrantBudget);
        totalBudget += registrantBudget.yearBudget;
      });
      return {
        prasaranaPercentage: newPrasaranaPercentage,
        registrantBudget: tempRegistrantBudget,
        totalBudget,
      };
    });
  },
  setNewSdmPercentage: (newSdmPercentage: number) => {
    set((state) => {
      const tempRegistrantBudget: RegistrantBudget[] = [];
      let totalBudget = 0;
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
          sdmBudget: yearBudget * newSdmPercentage,
        };
        tempRegistrantBudget.push(registrantBudget);
        totalBudget += registrantBudget.yearBudget;
      });
      return {
        sdmPercentage: newSdmPercentage,
        registrantBudget: tempRegistrantBudget,
        totalBudget,
      };
    });
  },
}));
