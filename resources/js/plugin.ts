import Table from "./components/Component.vue";

document.addEventListener("taskday:init", () => {
  Taskday.register("table", {
    views: [
      { id: "performing-table", name: "Table", component: Table }
    ],
  });
});
