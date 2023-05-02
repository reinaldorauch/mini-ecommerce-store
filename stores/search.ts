import { defineStore } from "pinia";

interface SearchStore {
  search: string;
}

export const useSearchStore = defineStore("search", {
  state: (): SearchStore => ({
    search: "",
  }),

  actions: {
    doSearch(search: string) {
      this.search = search;
      refreshNuxtData("prod-list");
    },
  },
});
