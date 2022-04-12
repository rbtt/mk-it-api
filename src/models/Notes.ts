import { prop, getModelForClass } from '@typegoose/typegoose'

class Notes {
  @prop()
  public id!: number

  @prop()
  public notes!: string
}

const NotesModel = getModelForClass(Notes)

export default NotesModel
