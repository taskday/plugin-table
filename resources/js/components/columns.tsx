import {
  flexRender,
  getCoreRowModel,
  useVueTable,
  type ColumnDef,
  ColumnOrderState,
  VisibilityState,
  Column,
} from "@tanstack/vue-table";

import {
  VFieldWrapper,
  VLink
} from 'taskday';


const columns = (props: any): ColumnDef<Card>[] => {
  return [
    {
      id: "title",
      header: () => "Title",
      accessorFn: (row: Card) => <VLink href={route('cards.show', row)}>
        {row.title} 
      </VLink>,
    },
    ...props.project.fields.map((field: Field) => {
      return {
        id: field.handle,
        header: () => field.title,
        accessorFn: (card: Card) => {
          return <VFieldWrapper card={card} field={field} />;
        },
      };
    }),
  ];
};

export default columns;
