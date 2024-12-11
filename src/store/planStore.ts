import { create } from "zustand";
import { InsuranceOfferResponse } from "@/services/providersApi";

interface PlanState {
  planData: InsuranceOfferResponse | null;
  setPlanData: (data: InsuranceOfferResponse) => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  planData: null,
  setPlanData: (data) => set({ planData: data }),
}));
