export class MenuModel {
  name: string = "";
  icon: string = "";
  url: string = "";
  isTitle: boolean = false;
  subMenus: MenuModel[] = [];
}

export const Menus: MenuModel[] = [
  {
    name: "Home Page",
    icon: "fas fa-solid fa-home",
    url: "/",
    isTitle: false,
    subMenus: []
  }
]