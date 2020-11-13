import {AfterViewInit, Component, Input, OnChanges} from '@angular/core';

declare const jsonTree: any;

@Component({
  selector: 'app-json-tree',
  templateUrl: './json-tree.component.html',
  styleUrls: ['./json-tree.component.scss']
})
export class JsonTreeComponent implements OnChanges, AfterViewInit {
  @Input() data: any;
  @Input() treeId: string;

  tree: any;

  ngOnChanges(): void {
    this.updateTree();
  }

  ngAfterViewInit(): void {
    this.updateTree();
  }

  updateTree(): void {
    if (this.data) {
      const wrapper = document.getElementById('tree-wrapper-' + this.treeId);

      if (wrapper) {
        this.tree = jsonTree.create(this.data, wrapper);

        this.tree.expand(node => {
          return node.childNodes.length < 1;
        });
      }
    }
  }

  disableExpandAll(): boolean {
    const wrapper = document.getElementById('tree-wrapper-' + this.treeId);

    if (wrapper) {
      const numExpandedNodes = wrapper.getElementsByClassName('jsontree_node_expanded').length;

      const numNodes = wrapper.getElementsByClassName('jsontree_node_complex').length;
      const numEmptyNodes = wrapper.getElementsByClassName('jsontree_node_complex jsontree_node_empty').length;

      return numExpandedNodes === (numNodes - numEmptyNodes);
    }
  }

  expandAll(): void {
    this.tree.expand();
  }

  disableCollapseAll(): boolean {
    const wrapper = document.getElementById('tree-wrapper-' + this.treeId);

    if (wrapper) {
      return wrapper.getElementsByClassName('jsontree_node_expanded').length <= 1;
    }
  }

  collapseAll(): void {
    this.tree.collapse();
  }
}
