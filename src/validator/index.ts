import { body, query, param } from 'express-validator'

class TodoValidator {
  checkCreateTodo() {
    return [
      body('id').optional().isUUID(4).withMessage('Id must be a UUID v4'),
      body('title').notEmpty().withMessage('Title cannot be empty'),
      body('completed').optional().isBoolean().withMessage('Completed should be boolean')

    ]
  }

  checkReadTodo() {
    return [
      query('limit').optional().isInt({ min: 1, max: 10 }).withMessage('Limit should be a number between 1 and 10'),
      query('page').optional().isInt({ min: 1 }).withMessage('Page should be a valid number')
    ]
  }

  checkIdParam() {
    return [
      param('id').isUUID(4).withMessage('Id must be a UUID v4')
    ]
  }
}

export default new TodoValidator()