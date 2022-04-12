import { prop, getModelForClass } from '@typegoose/typegoose'

class Ratings {
  @prop()
  public id!: number

  @prop()
  public rating!: number
}

const RatingsModel = getModelForClass(Ratings)

export default RatingsModel
