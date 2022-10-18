export interface IAdminSelectProps {
  id: string
  label: string
  value: string
  data: Nullable<string[]>
  error?: Nullable<string>
  callback: VoidFunc<string>
}
