import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { NextFunction } from "express";
import { AppService } from "src/app.service";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    private readonly logger = new Logger(AuthenticationMiddleware.name)
    constructor(private readonly requestService: AppService) { }
    use(req: Request, res: Response, next: NextFunction) {
        this.requestService.setUserId(123)
        const userId = this.requestService.getUserId()
        this.logger.log('Middleware ID', userId)
        next() //this will alow to continue for next step, we can get device headers and store
    }
}