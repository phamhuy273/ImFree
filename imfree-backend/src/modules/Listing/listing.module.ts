import { Module } from '@nestjs/common';
import { ListingService } from './listing.service.js';
import { ListingController } from './listing.controller.js';
import { DatabaseModule } from '../../database/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [ListingController],
  providers: [ListingService],
  exports: [ListingService],
})
export class ListingModule {}
