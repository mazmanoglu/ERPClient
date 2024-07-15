export class MenuModel {
  name: string = '';
  icon: string = '';
  url: string = '';
  isTitle: boolean = false;
  subMenus: MenuModel[] = [];
}

export const Menus: MenuModel[] = [
  {
    name: 'Home Page',
    icon: 'fas fa-solid fa-igloo',
    url: '/',
    isTitle: false,
    subMenus: [],
  },
  {
    name: "Main Group",
    icon: "fa fa-people-roof",
    url: "",
    isTitle: false,
    subMenus: [
      {
        name: "Customers",
        icon: "fa fa-people-group",
        url: "/customers",
        isTitle: false,
        subMenus: []
      }
    ]
  },
  {
    name: 'Admin',
    icon: 'fas fa-tools',
    url: '/admin',
    isTitle: false,
    subMenus: [],
  },
  {
    name: 'Guest',
    icon: 'fa fa-users',
    url: '/guest',
    isTitle: false,
    subMenus: [],
  },
  {
    name: 'Management',
    icon: 'fa fa-bars-progress',
    url: '/management',
    isTitle: false,
    subMenus: [
      {
        name: 'Users',
        icon: 'fa fa-user',
        url: '/users',
        isTitle: false,
        subMenus: [],
      },
    ],
  },
];
