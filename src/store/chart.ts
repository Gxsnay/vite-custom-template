import { idRandomString } from 'u@';
import { defineStore } from "pinia";

export const useChartStore = defineStore({
  id: "chart",
  state: () => {
    return {
      chartUpdateTag: '',
    };
  },
  getters: {
    chartUpdateTag: (state) => state.chartUpdateTag
  },
  actions: {
    updateChartView(state: { chartUpdateTag: string }) {
      state.chartUpdateTag = idRandomString();
    },
  },
});
