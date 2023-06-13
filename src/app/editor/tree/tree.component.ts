import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Network} from 'vis-network';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements AfterViewInit {
  @ViewChild('network') el: ElementRef | undefined;
  private network: Network | undefined;

  constructor() {
  }

  ngAfterViewInit(): void {
    const container = this.el?.nativeElement;
    const data = {
      nodes: [
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
      ],
      edges: [
        {from: 1, to: 2},
        {from: 1, to: 3},
      ],
    };
    const options = {};
    this.network = new Network(container, data, options);
  }
}
