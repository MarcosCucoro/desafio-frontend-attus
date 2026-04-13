import { MatPaginatorIntl } from '@angular/material/paginator';

export function getPortuguesePaginator(): MatPaginatorIntl {
  const paginator = new MatPaginatorIntl();

  paginator.itemsPerPageLabel = 'Usuários por página';
  paginator.nextPageLabel = 'Próxima página';
  paginator.previousPageLabel = 'Página anterior';
  paginator.firstPageLabel = 'Primeira página';
  paginator.lastPageLabel = 'Última página';

  paginator.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0) return `0 de ${length}`;

    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);

    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };

  return paginator;
}
