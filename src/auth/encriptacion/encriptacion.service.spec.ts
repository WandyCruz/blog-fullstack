import { Test, TestingModule } from '@nestjs/testing';
import { EncriptacionService } from './encriptacion.service';

describe('EncriptacionService', () => {
  let service: EncriptacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncriptacionService],
    }).compile();

    service = module.get<EncriptacionService>(EncriptacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
