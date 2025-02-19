/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FormContextInterface {
  values: Record<string, any>
  errors: Record<string, any>
  defineField: (name: string) => any
}
