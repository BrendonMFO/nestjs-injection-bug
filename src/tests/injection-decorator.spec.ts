import {
  TestService,
  SymbolService,
  SYMBOL_SERVICE,
  SYMBOL_INJECTOR,
} from '../app.service';
import { Test } from '@nestjs/testing';
import { ContextIdFactory } from '@nestjs/core';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
class TestTargetService {
  @Inject()
  private readonly testService: TestService;

  @Inject(SYMBOL_INJECTOR)
  private readonly [SYMBOL_SERVICE]: SymbolService;

  getTestService() {
    return this.testService;
  }

  getSymbolService() {
    return this[SYMBOL_SERVICE];
  }
}

describe('injection decorator', () => {
  let testTargetService: TestTargetService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TestService,
        TestTargetService,
        { provide: SYMBOL_INJECTOR, useClass: SymbolService },
      ],
    }).compile();

    const contextId = ContextIdFactory.create();
    testTargetService = await module.resolve(TestTargetService, contextId);
  });

  it('should be defined', () => {
    expect(testTargetService).toBeDefined();
  });

  it('should be defined - isTestServiceDefined', () => {
    const testService = testTargetService.getTestService();
    expect(testService).toBeDefined();
    expect(testService).toBeInstanceOf(TestService);
  });

  it('should be defined - isSymbolServiceDefined', () => {
    const symbolService = testTargetService.getSymbolService();
    expect(symbolService).toBeDefined();
    expect(symbolService).toBeInstanceOf(SymbolService);
  });
});

describe('injection decorator resolve', () => {
  let testService: TestService;
  let symbolService: SymbolService;
  let testTargetService: TestTargetService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TestService,
        TestTargetService,
        { provide: SYMBOL_INJECTOR, useClass: SymbolService },
      ],
    }).compile();

    const contextId = ContextIdFactory.create();
    [testService, testTargetService] = await Promise.all([
      module.resolve(TestService, contextId),
      module.resolve(TestTargetService, contextId),
      module.resolve(SYMBOL_INJECTOR, contextId),
    ]);
  });

  it('should be defined', () => {
    expect(testService).toBeDefined();
    expect(symbolService).toBeDefined();
    expect(testTargetService).toBeDefined();
  });
});
