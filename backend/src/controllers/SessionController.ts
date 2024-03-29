import { Response, Request } from 'express';
import { SessionService } from '../service/SessionService';

class SessionController {
    async create(request: Request, response: Response) {
        const sessionService = new SessionService();
        try {
            const { name, password } = request.body;
            const { ong, token } = await sessionService.execute(name, password);
            delete ong.password
            return response.json({ ong, token });
        } catch (error) {
            return response.status(400).json(error.message)
        }
    };
    async index(request: Request, response: Response) {
        const sessionService = new SessionService();
        try {
            const { id } = request.user;
            const ong = await sessionService.index(id);
            delete ong.password
            response.json(ong);
        } catch (error) {
            return response.status(400).json(error.message)
        }
    };
}

export { SessionController };