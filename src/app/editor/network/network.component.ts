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
        {id: 1, label: 'Botamon'},
        {id: 2, label: 'Koromon'},
        {id: 3, label: 'Agumon'},
        {id: 4, label: 'Greymon'},
        {id: 5, label: 'MetalGreymon'},
        {id: 6, label: 'WarGreymon'},
        {id: 7, label: 'SkullGreymon'},
        {id: 8, label: 'Tyrannomon'},
        {id: 9, label: 'MasterTyrannomon'},
      ],
      edges: [
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 3, to: 4},
        {from: 3, to: 8},
        {from: 4, to: 5},
        {from: 5, to: 6},
        {from: 4, to: 7},
        {from: 8, to: 9},
      ],
    };
    const options = {
      layout: {
        hierarchical: {
          direction: 'LR',
        },
      },
    };
    this.network = new Network(container, data, options);
  }
}
