import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Network} from 'vis-network';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements AfterViewInit {
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
    this.network = new Network(container, data, {});
  }
}
