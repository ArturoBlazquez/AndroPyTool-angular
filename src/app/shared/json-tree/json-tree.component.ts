import {AfterViewInit, Component, Input, OnChanges, ViewChild} from '@angular/core';

declare const jsonTree: any;

@Component({
  selector: 'app-json-tree',
  templateUrl: './json-tree.component.html',
  styleUrls: ['./json-tree.component.scss']
})
export class JsonTreeComponent implements OnChanges, AfterViewInit {
  @Input() data: any;
  @ViewChild('treeWrapper') treeWrapper;

  tree: any;

  ngOnChanges(): void {
    this.updateTree();
  }

  ngAfterViewInit(): void {
    this.updateTree();
  }

  updateTree(): void {
    if (this.data && this.treeWrapper) {
      this.tree = jsonTree.create(this.data, this.treeWrapper.nativeElement);

      this.tree.expand(node => {
        return node.childNodes.length < 1;
      });
    }
  }

  disableExpandAll(): boolean {
    if (this.data && this.treeWrapper) {
      const numExpandedNodes = this.treeWrapper.nativeElement.getElementsByClassName('jsontree_node_expanded').length;

      const numNodes = this.treeWrapper.nativeElement.getElementsByClassName('jsontree_node_complex').length;
      const numEmptyNodes = this.treeWrapper.nativeElement.getElementsByClassName('jsontree_node_complex jsontree_node_empty').length;

      return numExpandedNodes === (numNodes - numEmptyNodes);
    } else {
      return false;
    }
  }

  expandAll(): void {
    this.tree.expand();
  }

  disableCollapseAll(): boolean {
    if (this.data && this.treeWrapper) {
      return this.treeWrapper.nativeElement.getElementsByClassName('jsontree_node_expanded').length <= 1;
    } else {
      return true;
    }
  }

  collapseAll(): void {
    this.tree.collapse();
  }
}
