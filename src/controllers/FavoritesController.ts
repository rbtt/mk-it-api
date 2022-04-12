import { Request, Response } from 'express'
import { get, post, del } from './decorators/routes'
import { controller } from './decorators/controller'
import { bodyValidator } from './decorators/BodyValidator'
import FavoritesModel from '../models/Favorites'

@controller('/favorites')
class FavoritesController {
  @get('/')
  async getFavorites(req: Request, res: Response) {
    const favorites = await FavoritesModel.find({})

    res.json(
      favorites.map((item) => ({
        id: item.id,
        title: item.title,
        imageUri: item.imageUri,
      }))
    )
  }

  @post('/')
  @bodyValidator('id', 'title', 'imageUri')
  async addToFavorites(req: Request, res: Response) {
    const { id, title, imageUri } = req.body

    const isExisting = await FavoritesModel.findOne({ id: { $eq: id } })
    if (isExisting) {
      return res.status(400).json({ error: 'Item already exist in favorites' })
    }

    await FavoritesModel.create({ id, title, imageUri })

    res.json({ message: `${req.body.title} added to Favorites` })
  }

  @del('/')
  @bodyValidator('id')
  async removeFromFavorites(req: Request, res: Response) {
    const { id } = req.body
    const response = await FavoritesModel.findOneAndRemove({ id: { $eq: id } })

    if (!response) {
      res.status(406).json({ error: `Cannot find favorite movie with id: ${id}.` })
    }

    res.json({ message: `${response?.title} deleted from favorites` })
  }
}
