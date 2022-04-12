import { prop, getModelForClass } from '@typegoose/typegoose'

class Favorites {
  @prop()
  public id!: number

  @prop()
  public title!: string

  @prop()
  public imageUri!: string
}

const FavoritesModel = getModelForClass(Favorites)

export default FavoritesModel
