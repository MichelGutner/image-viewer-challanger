import { getTabConfig } from '../helpers';

describe('getTabConfig', () => {
  it('returns correct tab configuration with default counts', () => {
    const result = getTabConfig();
    
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      tab: 'remote',
      icon: 'layers',
      count: 0,
    });
    expect(result[1]).toEqual({
      tab: 'offline',
      icon: 'download-cloud',
      count: 0,
    });
  });

  it('returns correct tab configuration with custom counts', () => {
    const result = getTabConfig(5, 3);
    
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      tab: 'remote',
      icon: 'layers',
      count: 5,
    });
    expect(result[1]).toEqual({
      tab: 'offline',
      icon: 'download-cloud',
      count: 3,
    });
  });

  it('handles zero counts', () => {
    const result = getTabConfig(0, 0);
    
    expect(result[0].count).toBe(0);
    expect(result[1].count).toBe(0);
  });
}); 