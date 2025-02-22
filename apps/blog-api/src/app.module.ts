import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AclModule } from './modules/acl/acl.module';

@Module({
  imports: [AclModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
