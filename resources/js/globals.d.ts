interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  profile_photo_url: string;
}

interface Filter {
  id: string|number,
  handle: string,
  operator: string
  value: string
  operators: string,
  columns: string,
}
interface FilterGroup {
  id: string|number,
  operator: string,
  rules: Array<Filter|FilterGroup>
}

interface Member<T> {
  id: string
  user: User
  memberable: T
  updated_at: string
  created_at: string
}

interface Workspace {
  id: number;
  title: string;
  description: string;
  projects: Project[];
  members: Member<Workspace>[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  workspace: Workspace
  fields: Field[]
  customFields: any
  cards: Card[];
  share_uuid: string | null;
  members: Member<Project>[];
}

interface Card {
  id: string;
  title: string;
  content: string;
  comments: Comment[];
  fields: Field[];
  customFields: any;
  project: Project;
}

interface Field {
  id: number;
  title: string;
  handle: string;
  type: string;
  options: Object
  pivot: {
    value: string;
  }
}

interface Comment {
  id: number;
  content: string;
}

interface Pagination<Type> {
  current_page: number;
  data: Type[];
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: {url: string|null, label: string, active: Boolean }[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string|null
  to: number
  total: number
}

interface Breadcrumb {
  title: String;
  url?: String;
}

interface Audit {
  user: User;
  event: string;
  old_values: {
    [key: string]: string;
  };
  new_values: {
    [key: string]: string;
  };
  created_at: string
}
