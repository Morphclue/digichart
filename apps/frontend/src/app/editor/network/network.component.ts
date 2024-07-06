import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import Graph from 'graphology';
import {Sigma} from 'sigma';
import FA2LayoutSupervisor from "graphology-layout-forceatlas2/worker";
import {NodeImageProgram} from '@sigma/node-image';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements AfterViewInit, OnDestroy {
  @ViewChild('network') network: ElementRef | null = null;
  sigma?: Sigma;
  fa2?: FA2LayoutSupervisor;

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    this.http.get<any>(`http://localhost:3000/api/v1/Greymon`).subscribe(
      (data) => {
        this.transformData(data);
        this.drawGraph(data);
      });
  }

  ngOnDestroy(): void {
    this.sigma?.kill();
    this.fa2?.stop();
    this.fa2?.kill();
  }

  private transformData(data: any) {
    data.nodes.forEach((node: any) => {
      // node.x = Math.random() * 20;
      // node.y = Math.random() * 20;
      node.size = 10;
      node.color = '#008cc2';
      node.type = 'image';
      // node.image = node.href;
    });
    data.edges.forEach((edge: any) => {
      edge.color = '#282c34';
      edge.type = 'line';
      edge.size = 0.1;
    });
  }

  private drawGraph(data: any) {
    const graph = new Graph();
    data.nodes.forEach((node: any) => graph.addNode(node.id, {...node}));
    data.edges.forEach((edge: any) => {
      graph.addEdge(edge.source, edge.target, {...edge});
    });
    // FIXME: refactor fa2
    // this.fa2 = new FA2LayoutSupervisor(graph, {
    //   settings: {
    //     linLogMode: true,
    //     outboundAttractionDistribution: true,
    //     adjustSizes: true,
    //     gravity: 1,
    //     slowDown: 1 + Math.log(graph.order) / 10,
    //     barnesHutOptimize: true,
    //     barnesHutTheta: 0.6,
    //   },
    // });
    // this.fa2.start();
    if (this.network) {
      this.sigma = new Sigma(graph, this.network.nativeElement, {
        nodeProgramClasses: {
          image: NodeImageProgram,
        },
      });
      this.sigma.refresh();
    }
  }
}
