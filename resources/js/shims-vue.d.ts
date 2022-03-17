declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}


declare module "taskday" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export { component };
}
