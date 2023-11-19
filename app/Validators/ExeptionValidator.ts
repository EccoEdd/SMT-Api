import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

export default class ExeptionValidator {
  constructor({ response }: HttpContextContract, Err: any) {
    const { messages: { errors: [error] } } = Err

    const { message, field, rule } = error

    if (Env.get('NODE_ENV') == 'development') {
      console.log(error)
    }

    response
      .status(
        rule == 'exists' ? 404 : 400
      )
      .json({
        status: 'Error',
        message,
        data: {
          field,
          rule,
        }
      })
  }
}