import * as services from '../index';

describe('services index', () => {
  it('deve exportar os módulos corretamente', () => {
    expect(services).toBeDefined();
    expect(Object.keys(services).length).toBeGreaterThan(0);
  });
}); 