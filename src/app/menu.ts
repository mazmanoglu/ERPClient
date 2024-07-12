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
    icon: 'fa fa-home',
    url: '/',
    isTitle: false,
    subMenus: [],
  },
  {
    name: 'Admin',
    icon: 'fa fa-lock',
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
    icon: 'fa fa-list',
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
