import { ChangeDetectorRef, Component, Injectable, SimpleChanges } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { merge } from 'rxjs';
import { map } from 'rxjs';

export interface ModulesNode {
  name: string;
  icon?: string;
  children?: ModulesNode[];
  isCurrentNodeRoot?: boolean;
  isCurrentNodeSegment?: boolean;
  isCurrentNodeFamily?: boolean;
  isCurrentNodeIncidentType?: boolean;
  isCurrentNodeIncidentAction?: boolean;
  parent?: ModulesNode[];
  ok?: boolean;
  expandable: boolean
}

const TREE_DATA: ModulesNode[] = [
  {
    name: 'Modules',
    icon: '',
    isCurrentNodeRoot: true,
    expandable: true
  }
];

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {
  treeControl = new NestedTreeControl<ModulesNode>(node => node.children);
  dataSource: any = new MatTreeNestedDataSource<ModulesNode>();
  UnPublishedDataSource = new MatTreeNestedDataSource<ModulesNode>();
  activeNode;
  subscription = new Subscription;
  treeLoader: boolean | any;
  currentExpandedNode: any;
  listExpandedNodes = [];
  loader: boolean | any;
  prevExpansionModel: any;

  constructor(private cdr: ChangeDetectorRef) {
    this.dataSource.data = TREE_DATA;
    this.activeNode = TREE_DATA[0];
    this.populateTree(TREE_DATA[0]);
    // this.toggleNode(TREE_DATA[0]);
    // this.changeActiveNode.emit(this.activeNode);
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) { }

  resetTree() { }

  hasChild = (_: number, node: ModulesNode) => !!node.children && node.children.length > 0 || (node?.expandable);

  toggleNode(node: ModulesNode) {
    if (this.treeControl.isExpanded(node)) {
      this.removenodeFromExpandedList(node);
      this.treeControl.collapse(node);
    }
    else this.expand(node);
    this.prevExpansionModel = this.treeControl.expansionModel.selected;
  }

  expand(node: any) {
    this.populate(node);
    this.currentExpandedNode = node;
    // this.addNodetoListofExpandedNodes(node);
    this.treeControl.expand(node);
  }

  refreshTreeData() {
    const data = this.dataSource.data;
    this.dataSource.data = null;
    this.dataSource.data = data;
  }

  populateSegments(node: any) {
    this.getIncidentSegments(node);
    this.treeControl.expand(node);
  }


  updateChildren(node: any, children: any) {
    node.children = children;
    this.dataSource.data = [...this.dataSource.data];
    this.refreshTreeData();
  }

  getIncidentSegments(node: any) {
    this.treeLoader = true;
    let newchildren = { parent: node, icon: '', isCurrentNodeSegment: true };
    this.updateChildren(node, newchildren);
    this.treeLoader = false;
  }


  setActiveNode(node: any) {
    if (!node?.isCurrentNodeIncidentAction) {
      // this.activeNode = node;
      // this.expand(node);
      // if (!node?.children || node?.children?.length == 0) this.fetchNodeDetails(node);
      // this.changeActiveNode.emit(this.activeNode);
    }
  }

  fetchNodeDetails(node: any) {
    this.currentExpandedNode = node;
    if (!node.children) {
      node.children = [];
    }
    if (node?.isCurrentNodeRoot) this.getIncidentSegments(node);
  }


  filterSearch(text: string, node: any) {
    this.setChildOk(text, node);
  }

  setChildOk(text: string, node: any) {
    text = String(text)?.toLowerCase();
    node.forEach((x: any) => {
      x.ok = x.name?.toLowerCase().indexOf(text) >= 0;
      if (x.parent) this.setParentOk(text, x.parent, x.ok);
      if (x.children) this.setChildOk(text, x.children);
    });
  }

  setParentOk(text: any, node: any, ok: any) {
    text = String(text)?.toLowerCase();
    node.ok = ok || node.ok || node.name?.toLowerCase().indexOf(text) >= 0;
    if (node.parent) this.setParentOk(text, node.parent, node.ok);
  }

  populateTree(node: any) {
    this.loader = true;
    this.currentExpandedNode = node;
    if (!node.children) {
      node.children = [];
    }
    if (node?.isCurrentNodeRoot) {
      if (!node.children || node?.children?.length == 0) this.populateAll(node);
      else this.treeControl.expand(node);
    }
  }

  populateAll(node: any) {
    this.treeLoader = true;
    let data = [{ name: 'Alcohol Information Module', id: 3236262, expandable: true }, { name: 'Allergen Information Module', id: 7888, expandable: true }];
    let newchildren = data.map((item) => {
      return { parent: node, ...item };
    })
    this.updateChildren(node, newchildren);
    this.treeLoader = false;
    this.treeControl.expand(node);
  }

  populate(node: any) {
    this.treeLoader = true;
    let data: any = [];
    if (node?.name === 'Alcohol Information Module') data = [{ name: 'Alcohol New Container', id: 9986262 }, { name: 'New Module', id: 6888, expandable: false }];
    else if (node?.name === 'Allergen Information Module') data = [{ name: 'Allergen New Container', id: 8287262 }, { name: 'New Module', id: 999, expandable: false }];
    if (data?.length > 0) {
      let newchildren = data.map((item:any) => {
        return { parent: node, ...item };
      });
      this.updateChildren(node, newchildren);
      this.treeLoader = false;
      this.treeControl.expand(node);
    }

  }


  addNodetoListofExpandedNodes(node: any) {
    // const exists = this.listExpandedNodes.some((item:any) => item.name === node.name && item.id === node.id);
    // if (!exists) this.listExpandedNodes.push(node);
  }

  removenodeFromExpandedList(node: any) {
    const index = this.listExpandedNodes.findIndex((obj: any) => {
      return obj.id === node.id && obj.name === node.name;
    });
    if (index !== -1) this.listExpandedNodes.splice(index, 1);
  }

  loadUpdatedTree() {
    this.loader = true;
    const TREE_DATA_: ModulesNode[] = [
      {
        name: 'Modules',
        icon: '/assets/icons/Configuration_Icons/Group 7807.png',
        isCurrentNodeRoot: true,
        expandable: true
      }
    ];
    this.dataSource.data = null;
    this.dataSource.data = TREE_DATA_;
    this.populateTree(TREE_DATA_[0]);
  }

  checkNodeExpanded(node: any) {
    this.listExpandedNodes.map((item: any) => {
      if (item?.name === node?.name && item?.id === node?.id && item && node) this.treeControl.expand(node);
      // if(this.activeNode?.name === node?.name && this.activeNode?.id === node?.id && this.activeNode && node) this.setActiveNode(node);
    });
  }


  getPrevExpansionModel() {
    this.prevExpansionModel.forEach((object: any) => this.treeControl.expand(object));
  }

}
