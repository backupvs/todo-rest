import { Document } from "mongoose"

export interface ItemInterface extends Document {
    readonly name: string
    readonly description: string
    readonly isDone: boolean
}
