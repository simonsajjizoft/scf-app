
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[columnResize]'
})
export class ColumnResizeDirective {
  private startX!: number;
  private isResizing = false;
  private initialWidth!: number;
  private columnIndex!: number;
  private table: HTMLElement | any = null; // Initialize table as null

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.startX = event.pageX;
    this.isResizing = true;
    this.initialWidth = this.el.nativeElement.offsetWidth;

    // Find the index of the current column
    const row = this.el.nativeElement.parentElement;
    const cells = Array.from(row.children);
    this.columnIndex = cells.indexOf(this.el.nativeElement);

    this.renderer.addClass(this.el.nativeElement, 'resizing');
    this.renderer.addClass(document.body, 'resizing');

    this.table = this.findParentTable(this.el.nativeElement);

    if (this.table) {
      const columns = this.table.querySelectorAll('th');

      const onMouseMove = (moveEvent: MouseEvent) => {
        if (this.isResizing) {
          const deltaX = moveEvent.pageX - this.startX;
          const newWidth = this.initialWidth + deltaX;

          // Update the width of the current column
          this.renderer.setStyle(this.el.nativeElement, 'width', newWidth + 'px');

          // Update the width of the corresponding header and cell in each row
          columns[this.columnIndex].style.width = newWidth + 'px';
          const rows = this.table?.querySelectorAll('tr');
          rows?.forEach((row:any) => {
            const cells = row.querySelectorAll('td');
            if (cells[this.columnIndex]) {
              cells[this.columnIndex].style.width = newWidth + 'px';
            }
          });

          // Adjust the width of the table if it has a fixed width
          const tableWidth = this.table.offsetWidth;
          if (tableWidth > 0) {
            this.renderer.setStyle(this.table, 'width', tableWidth + deltaX + 'px');
          }
        }
      };

      const onMouseUp = () => {
        this.isResizing = false;
        this.renderer.removeClass(this.el.nativeElement, 'resizing');
        this.renderer.removeClass(document.body, 'resizing');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  }

  private findParentTable(element: HTMLElement | any): HTMLElement | null {
    while (element) {
      if (element.tagName === 'TABLE') {
        return element;
      }
      element = element?.parentElement;
    }
    return null;
  }
}