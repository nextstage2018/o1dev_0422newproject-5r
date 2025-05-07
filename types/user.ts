export type UserType = "internal" | "external" | "client"

export type UserRole = "admin" | "project_manager" | "ad_operator" | "sales_rep" | "client"

export interface UserPermission {
  accountId: string
  roles: UserRole[]
}

export interface User {
  id: string
  name: string
  email: string
  type: UserType
  department?: string
  company?: string
  permissions: UserPermission[]
  createdAt: string
  updatedAt: string
}

export interface Account {
  id: string
  name: string
  platform: string
  clientId: string
  clientName: string
}
