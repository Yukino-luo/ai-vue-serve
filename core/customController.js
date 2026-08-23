class CustomController {

  async list(ctx) {
    ctx.body = { users: [] };
  }

  async getById(ctx) {
    ctx.body = { user: { id: ctx.params.id } };
  }

  async create(ctx) {
    ctx.body = { message: 'User created' };
  }

  async update(ctx) {
    ctx.body = { message: 'User updated' };
  }

  async delete(ctx) {
    ctx.body = { message: 'User deleted' };
  }
}

export default CustomController
