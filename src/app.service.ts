import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private userId: number;

  setUserId(userId: number) {
    this.userId = userId
  }

  getUserId() {
    return this.userId;
  }

  getHello(): string {
    return 'Test CRUD!';
  }

  // getMiddleware(): string {
  //   const userId = this.userId
  //   return 'Test CRUD!';
  // }
}
