import { CarteType } from "./CarteType"

export type PaymentCreate = {
    id: number
    name: string
    order: string
    person: string
    total: string
    data?: CarteType
}