export interface IAdminSidebarItemProps {
  id: string;
  name: string;
  icon: JSX.Element;
  active: boolean;
  callback: VoidFunc<string>;
}
