import { Injectable, Scope } from '@nestjs/common';

export const SYMBOL_SERVICE = Symbol('__symbol_service__');
export const SYMBOL_INJECTOR = Symbol('__symbol_injector__');

@Injectable({ scope: Scope.REQUEST })
export class SymbolService {}

@Injectable({ scope: Scope.REQUEST })
export class TestService {}
