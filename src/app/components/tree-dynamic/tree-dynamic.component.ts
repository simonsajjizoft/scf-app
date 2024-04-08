import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
  id?:Number | String
}

const TREE_DATA: FoodNode[] = [
  {
    name:'Alcohol Information Module',id:100,
    children: [{name: 'Alcohol Beverage Container',id:101}, {name: 'Alcohol Other Informationetc',id:102}, {name: 'Alcohol Contents Information',id:103}],
  },
  {
    name: 'Allergen Information Module',id:200,
    children: [
      {
        name: 'Allergen Container Module',id:201,
        children: [{name: 'Material Module',id:202,}, {name: 'Process Type Module',id:203,},{name:'Shape',id:204,}],
      },
      {
        name: 'Chemical Information Module',id:300,
        children: [{name: 'Chemical Regulation Module',id:301,}, {name: 'Substances Mix Module',id:302,}],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id:any;
  children?:any
}

@Component({
  selector: 'tree-dynamic',
  templateUrl: './tree-dynamic.component.html',
  styleUrls: ['./tree-dynamic.component.scss'],
})
export class TreeDynamicComponent {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id:node.id,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource:any = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  addNode(parentNode: ExampleFlatNode) {
    const newNode: FoodNode = {
      name: 'New Child Node',
      children: [] // If it's a leaf node, keep it empty, otherwise add children as needed
    };
    parentNode.children.push(newNode);
    // Update the data source
    this.dataSource.data = [...this.dataSource.data];
  }

}