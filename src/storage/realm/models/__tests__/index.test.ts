import * as models from '../index';

describe('models index', () => {
  it('deve exportar os models corretamente', () => {
    expect(models).toBeDefined();
    expect(Object.keys(models).length).toBeGreaterThan(0);
  });
}); 