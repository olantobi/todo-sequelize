import express from 'express'

import TodoValidator from '../validator'
import Middleware from '../middleware'
import TodoController from '../controller'

const router = express.Router()

router.get('/', TodoValidator.checkReadTodo(), Middleware.handleValidationError, TodoController.getAllTodos)

router.get('/:id', TodoValidator.checkIdParam(),Middleware.handleValidationError, TodoController.getTodo)

router.post('/', TodoValidator.checkCreateTodo(),Middleware.handleValidationError, TodoController.createTodo)

router.put('/:id', TodoValidator.checkIdParam(),Middleware.handleValidationError, TodoController.updateTodo)

router.delete('/:id', TodoValidator.checkIdParam(),Middleware.handleValidationError, TodoController.deleteTodo)

export default router