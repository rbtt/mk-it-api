import { Request, Response } from 'express'
import { post, put } from './decorators/routes'
import { controller } from './decorators/controller'
import { bodyValidator } from './decorators/BodyValidator'

import RatingsModel from '../models/Ratings'

@controller('/ratings')
class NotesController {
  @post('/')
  @bodyValidator('id')
  async getRatings(req: Request, res: Response) {
    const { id } = req.body
    const response = await RatingsModel.findOne({ id: { $eq: id } })
    if (response) {
      return res.status(200).json({ rating: response.rating })
    }
    res.json({ error: 'No ratings found.' })
  }

  @put('/')
  @bodyValidator('id', 'rating')
  async updateRating(req: Request, res: Response) {
    const { id, rating } = req.body

    const updateResponse = await RatingsModel.findOneAndUpdate(
      { id: { $eq: id } },
      { id, rating }
    )
    const createResponse = !updateResponse && (await RatingsModel.create({ id, rating }))

    if (updateResponse || createResponse) {
      return res.status(200).json({ rating })
    }

    res.json({ error: 'Server Error.' })
  }
}
