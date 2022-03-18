import { Module } from '@nestjs/common';
import { TestService, SymbolService, SYMBOL_INJECTOR } from './app.service';

@Module({
  providers: [
    TestService,
    { provide: SYMBOL_INJECTOR, useClass: SymbolService },
  ],
})
export class AppModule {}
