import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ExeptionValidator from 'App/Validators/ExeptionValidator'
import UserValidator from 'App/Validators/UserValidator'

export default class UsersController {

    public async create(ctx: HttpContextContract){
        const { request, response } = ctx

        try {
            var data = await request.validate(UserValidator)
        } catch (err) {
            return new ExeptionValidator(ctx, err)
        }

        await User.create({
            ...data,
            active: true
        })

        return response.ok({
            status: 'Ok',
            message: 'User created',
            data: null
        })
    }

    public async update(ctx: HttpContextContract){
        const { params, request, response } = ctx

        try {
        var data = await request.validate(UserValidator)
        } catch (Err) {
        return new ExeptionValidator(ctx, Err)
        }

        const user = await User.find(params.id)

        if(!user){
            return response.notFound({
                status: 'Error',
                message: 'User not found',
                data: null
            })
        }

        await user.merge(data).save()

        return response.ok({
            status: 'Ok',
            message: 'User updated',
            data: null
        })
    }

    public async get({params, response}: HttpContextContract){
        const users = await User.all()

        return response.ok({
            status: 'Ok',
            messagae: 'All of the users',
            data: users
        })
    }

    public async delete({params, response}: HttpContextContract){
        const user = await User.find(params.id)

        if(!user){
            return response.notFound({
                status: 'Error',
                message: 'User not found',
                data: null
            })
        }

        await user.merge({active: !user.active}).save()

        return response.ok({
            status: 'Ok',
            message: `User ${user.active ? 'active' : 'deactived'}`,
            data: null
        })
    }

}
