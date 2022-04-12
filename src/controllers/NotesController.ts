import { Request, Response } from 'express'
import { post, put } from './decorators/routes'
import { controller } from './decorators/controller'
import { bodyValidator } from './decorators/BodyValidator'

import NotesModel from '../models/Notes'

@controller('/notes')
class NotesController {
  @post('/')
  @bodyValidator('id')
  async getNotes(req: Request, res: Response) {
    const { id } = req.body
    const response = await NotesModel.findOne({ id: { $eq: id } })
    if (response) {
      return res.status(200).json({ notes: response.notes })
    }
    res.status(404).json({ error: `No notes for id ${id}` })
  }

  @put('/')
  @bodyValidator('id')
  async updateNotes(req: Request, res: Response) {
    const { id, notes } = req.body

    const updateResponse = await NotesModel.findOneAndUpdate(
      { id: { $eq: id } },
      { id, notes }
    )

    // if (response) {
    //   return res.status(200).json({ notes })
    // } else {
    //   const createResponse = await NotesModel.create({ id, notes })
    //   return res.status(200).json({ notes: createResponse.notes })
    // }
    const createResponse = !updateResponse && (await NotesModel.create({ id, notes }))

    if (updateResponse || createResponse) {
      return res.status(200).json({ notes })
    }

    res.json({ error: 'Server Error.' })
  }
}
