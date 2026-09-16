import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import {db} from '../prisma/db.js';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  public client = db;

  async onModuleInit() {

    this.logger.log('✅ PostgreSQL Database connection initialized successfully!');
  }

  async onModuleDestroy() {
    this.logger.log('PostgreSQL Database connection closed.');
  }
}