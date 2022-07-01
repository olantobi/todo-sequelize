import { Request, Response } from 'express'
import { TodoInstance } from '../model'
import { v4 as uuid } from 'uuid'

class TodoController {
  async getAllTodos(req: Request, res: Response) {
      try {
        let limit = req.query?.limit as number | undefined
        limit = limit ? limit : 10
        const page = req.query?.page as number | undefined
        const offset = page ? ((page-1) * limit) : 0
  
        const records = await TodoInstance.findAll({where: {}, limit, offset })
  
        res.json({records, msg: 'Successfully fetched todo items'})
      } catch(e) {
        res.status(500).json({ msg: 'Unable to fetch todo items', status: 500 })
      }
  }  

  async getTodo(req: Request, res: Response) {
    try {
      const { id } = req.params
      const record = await TodoInstance.findByPk(id)
      if (!record) {
        return res.status(404).json({ msg: `Todo item with id ${id} not found`, status: 400 })
      }

      res.json({record, msg: 'Successfully fetched todo item'})
    } catch(e) {
      res.status(500).json({ msg: 'Unable to fetch todo item', status: 500 })
    }
  }

  async createTodo(req: Request, res: Response) {
    const id = uuid()
    try {
      const record = await TodoInstance.create({ ...req.body, id })

      res.json({record, msg: 'Successfully created todo item'})
    } catch(e) {
      return res.status(500).json({ msg: 'Unable to create todo item', status: 500 })
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      const { id } = req.params
      const record = await TodoInstance.findByPk(id)
      if (!record) {
        return res.status(404).json({ msg: `Todo item with id ${id} not found`, status: 400 })
      }
      
      const updatedRecord = await record.update({ completed: !record.getDataValue('completed') })
      res.json({record: updatedRecord, msg: 'Successfully updated todo item'})
    } catch(e) {
      res.status(500).json({ msg: 'Unable to update todo item', status: 500 })
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      const { id } = req.params
      const record = await TodoInstance.findByPk(id)
      if (!record) {
        return res.status(404).json({ msg: `Todo item with id ${id} not found`, status: 400 })
      }
      
      await record.destroy()
      res.json({msg: 'Successfully deleted todo item'})
    } catch(e) {
      res.status(500).json({ msg: 'Unable to delete todo item', status: 500 })
    }
  }
}

export default new TodoController()
