import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, ElementRef, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  item?: any;
  children?: TodoItemNode[];
  id?:Number | String;
  expandable?:boolean
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item?: any;
  level?: number;
  expandable?: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = [
  {
    item:'Alcohol Information Module',id:100,expandable:true,
    children: [{item: 'Alcohol Beverage Container',id:101}, {item: 'Alcohol Other Informationetc',id:102}, {item: 'Alcohol Contents Information',id:103}],
  },
  {
    item: 'Allergen Information Module',id:200,expandable:true,
    children: [
      {
        item: 'Allergen Container Module',id:201,expandable:true,
        children: [{item: 'Material Module',id:202,}, {item: 'Process Type Module',id:203,},{item:'Shape',id:204,}],
      },
      {
        item: 'Chemical Information Module',id:300,expandable:true,
        children: [{item: 'Chemical Regulation Module',id:301,expandable:true}, {item: 'Substances Mix Module',id:302,}],
      },
    ],
  },
];

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);
    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(data: TodoItemNode[], level: number): TodoItemNode[] {
    return data.map(item => {
      const node = new TodoItemNode();
      node.item = item.item;
      node.id = item.id;
      node.expandable = item?.expandable;
      if (item.children && item.children.length > 0) {
        node.children = this.buildFileTree(item.children, level + 1);
      }
      return node;
    });
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, item: any): TodoItemNode {
    if (!parent.children) {
      parent.children = [];
    }
    const newItem = { ...item} as TodoItemNode;
    parent.children.push(newItem);
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemAbove(node: TodoItemNode, item: any): TodoItemNode {
    const parentNode:any = this.getParentFromNodes(node);
    const newItem = {...item } as TodoItemNode;
    if (parentNode) {
      parentNode?.children.splice(parentNode?.children.indexOf(node), 0, newItem);
    } else {
      this.data.splice(this.data.indexOf(node), 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  insertItemBelow(node: TodoItemNode, item: any): TodoItemNode {
    const parentNode:any = this.getParentFromNodes(node);
    const newItem = { ...item } as TodoItemNode;
    if (parentNode) {
      parentNode.children.splice(parentNode.children.indexOf(node) + 1, 0, newItem);
    } else {
      this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
    }
    this.dataChange.next(this.data);
    return newItem;
  }

  getParentFromNodes(node: TodoItemNode): any {
    for (let i = 0; i < this.data.length; ++i) {
      const currentRoot = this.data[i];
      const parent = this.getParent(currentRoot, node);
      if (parent != null) {
        return parent;
      }
    }
    return null;
  }

  getParent(currentRoot: TodoItemNode, node: TodoItemNode): any {
    if (currentRoot.children && currentRoot.children.length > 0) {
      for (let i = 0; i < currentRoot.children.length; ++i) {
        const child = currentRoot.children[i];
        if (child === node) {
          return currentRoot;
        } else if (child.children && child.children.length > 0) {
          const parent = this.getParent(child, node);
          if (parent != null) {
            return parent;
          }
        }
      }
    }
    return null;
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }

  deleteItem(node: TodoItemNode) {
    this.deleteNode(this.data, node);
    this.dataChange.next(this.data);
  }

  copyPasteItem(from: TodoItemNode, to: TodoItemNode): TodoItemNode {
    const newItem = this.insertItem(to, from);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemAbove(from: TodoItemNode, to: TodoItemNode): TodoItemNode {
    const newItem = this.insertItemAbove(to, from);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  copyPasteItemBelow(from: TodoItemNode, to: TodoItemNode): TodoItemNode {
    const newItem = this.insertItemBelow(to, from);
    if (from.children) {
      from.children.forEach(child => {
        this.copyPasteItem(child, newItem);
      });
    }
    return newItem;
  }

  deleteNode(nodes: TodoItemNode[], nodeToDelete: TodoItemNode) {
    const index = nodes.indexOf(nodeToDelete, 0);
    if (index > -1) {
      nodes.splice(index, 1);
    } else {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          this.deleteNode(node.children, nodeToDelete);
        }
      });
    }
  }

  
  appendNewChildren(from: TodoItemNode, to: TodoItemNode): any {
    const item = { item: 'qfihbqifbiqf' ,expandable:true,id:32993} as TodoItemNode;
    if (!to.children) {
      to.children = [];
    }
    const newItem = {...item} as TodoItemNode;
    to?.children.push(newItem);
    this.dataChange.next(this.data);
  }
}


@Component({
  selector: 'app-tree-drag-drop',
  templateUrl: './tree-drag-drop.component.html',
  styleUrls: ['./tree-drag-drop.component.scss'],
  providers: [ChecklistDatabase]
})
export class TreeDragDropComponent {
    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap:any = new Map<TodoItemFlatNode, TodoItemNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  
    /** A selected parent node to be inserted */
    selectedParent: TodoItemFlatNode | null = null;
  
    /** The new item's name */
    newItemName = '';
  
    treeControl: FlatTreeControl<TodoItemFlatNode | any>;
  
    treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  
    dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;
  
    /** The selection for checklist */
    checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
  
    /* Drag and drop */
    dragNode: any;
    dragNodeExpandOverWaitTimeMs = 300;
    dragNodeExpandOverNode: any;
    dragNodeExpandOverTime: number|any;
    dragNodeExpandOverArea: string|any;
    @ViewChild('emptyItem') emptyItem: ElementRef| any;
  
    constructor(private database: ChecklistDatabase) {
      this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
      this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
      database.dataChange.subscribe(data => {
        this.dataSource.data = [];
        this.dataSource.data = data;
      });
    }
  
    getLevel = (node: TodoItemFlatNode |any) => node.level;
  
    isExpandable = (node: TodoItemFlatNode|any) => node.expandable;
  
    getChildren = (node: TodoItemNode): any => node.children;
  
    hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;
  
    hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';
  
    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: TodoItemNode, level: number) => {
      const existingNode = this.nestedNodeMap.get(node);
      const flatNode = existingNode && existingNode.item === node.item
        ? existingNode
        : new TodoItemFlatNode();
      flatNode.item = node.item;
      flatNode.level = level;
      flatNode.expandable = (node.children && node.children.length > 0) || (node?.expandable); //edited
      this.flatNodeMap.set(flatNode, node);
      this.nestedNodeMap.set(node, flatNode);
      return flatNode;
    }
  
    /** Whether all the descendants of the node are selected */
    descendantsAllSelected(node: TodoItemFlatNode): boolean {
      const descendants = this.treeControl.getDescendants(node);
      return descendants.every(child => this.checklistSelection.isSelected(child));
    }
  
    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
      const descendants = this.treeControl.getDescendants(node);
      const result = descendants.some(child => this.checklistSelection.isSelected(child));
      return result && !this.descendantsAllSelected(node);
    }
  
    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: TodoItemFlatNode): void {
      this.checklistSelection.toggle(node);
      const descendants = this.treeControl.getDescendants(node);
      this.checklistSelection.isSelected(node)
        ? this.checklistSelection.select(...descendants)
        : this.checklistSelection.deselect(...descendants);
    }
  
    /** Select the category so we can insert the new item. */
    addNewItem(node: TodoItemFlatNode) {
      const parentNode:any = this.flatNodeMap.get(node);
      this.database.insertItem(parentNode, '');
      this.treeControl.expand(node);
    }
  
    /** Save the node to database */
    saveNode(node: TodoItemFlatNode, itemValue: string) {
      const nestedNode:any = this.flatNodeMap.get(node);
      this.database.updateItem(nestedNode, itemValue);
    }

    
    handleDragStart(event:any, node:any) {
      // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
      event.dataTransfer.setData('foo', 'bar');
      event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
      this.dragNode = node;
      this.treeControl.collapse(node);
    }
  
    handleDragOver(event:any, node:any) {
      event.preventDefault();
  
      // Handle node expand
      if (node === this.dragNodeExpandOverNode) {
        if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
          if ((new Date().getTime() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) {
            this.treeControl.expand(node);
          }
        }
      } else {
        this.dragNodeExpandOverNode = node;
        this.dragNodeExpandOverTime = new Date().getTime();
      }
      // Handle drag area
      const percentageX = event.offsetX / event.target.clientWidth;
      const percentageY = event.offsetY / event.target.clientHeight;
      if (percentageY < 0.25) {
        this.dragNodeExpandOverArea = 'above';
      } else if (percentageY > 0.75) {
        this.dragNodeExpandOverArea = 'below';
      } else {
        this.dragNodeExpandOverArea = 'center';
      }
    }
  
    handleDrop(event:any, node:any) {
      event.preventDefault();
      if (node !== this.dragNode) {
        let newItem: TodoItemNode;
        if (this.dragNodeExpandOverArea === 'above') {
          newItem = this.database.copyPasteItemAbove(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
        } else if (this.dragNodeExpandOverArea === 'below') {
          newItem = this.database.copyPasteItemBelow(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
        } else {
          newItem = this.database.copyPasteItem(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
        }
        this.database.deleteItem(this.flatNodeMap.get(this.dragNode));
        this.treeControl.expand(this.nestedNodeMap.get(newItem));
      }
      this.dragNode = null;
      this.dragNodeExpandOverNode = null;
      this.dragNodeExpandOverTime = 0;
    }
  
    handleDragEnd(event:any) {
      this.dragNode = null;
      this.dragNodeExpandOverNode = null;
      this.dragNodeExpandOverTime = 0;
    }

    appendNewChildren(from:TodoItemNode,to:TodoItemNode,isExpand:boolean){
      if(!isExpand){
        this.database.appendNewChildren(from, this.flatNodeMap.get(to));
        this.treeControl.expand(to);
      }
      else this.treeControl.collapse(to);
      
    }


}
