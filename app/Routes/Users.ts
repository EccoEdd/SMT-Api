import Route from '@ioc:Adonis/Core/Route'

Route.group(()=> {
    Route.get('/get', 'UsersController.get')
    Route.post('/create', 'UsersController.create')
    Route.patch('/update/:id', 'UsersController.update')
    Route.delete('/delete/:id', 'UsersController.delete')
}).prefix('api/v1/users')