import { getPortuguesePaginator } from './paginator-intl';
import { describe, it, expect } from 'vitest';

describe('getPortuguesePaginator', () => {
  it('should return correct Portuguese labels', () => {
    const paginator = getPortuguesePaginator();

    expect(paginator.itemsPerPageLabel).toBe('Usuários por página');
    expect(paginator.nextPageLabel).toBe('Próxima página');
    expect(paginator.previousPageLabel).toBe('Página anterior');
    expect(paginator.firstPageLabel).toBe('Primeira página');
    expect(paginator.lastPageLabel).toBe('Última página');
  });

  it('should format range correctly for first page', () => {
    const paginator = getPortuguesePaginator();
    const label = paginator.getRangeLabel(0, 5, 20);
    expect(label).toBe('1 - 5 de 20');
  });

  it('should format range correctly for middle page', () => {
    const paginator = getPortuguesePaginator();
    const label = paginator.getRangeLabel(1, 5, 20);
    expect(label).toBe('6 - 10 de 20');
  });

  it('should format range correctly for last page', () => {
    const paginator = getPortuguesePaginator();
    const label = paginator.getRangeLabel(3, 5, 20);
    expect(label).toBe('16 - 20 de 20');
  });

  it('should handle partial last page', () => {
    const paginator = getPortuguesePaginator();
    const label = paginator.getRangeLabel(2, 5, 13);
    expect(label).toBe('11 - 13 de 13');
  });

  it('should handle empty list', () => {
    const paginator = getPortuguesePaginator();
    const label = paginator.getRangeLabel(0, 5, 0);
    expect(label).toBe('0 de 0');
  });
});
