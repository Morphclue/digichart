import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import Graph from 'graphology';
import {Sigma} from 'sigma';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements AfterViewInit, OnDestroy {
  @ViewChild('network') network: ElementRef | null = null;
  sigma?: Sigma;

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    const id = 797; // Jijimon
    this.http.get<any>(`http://localhost:3000/api/v1/${id}`).subscribe(
      (data) => {
        data.nodes.forEach((node: any) => {
          node.x = Math.random() * 20;
          node.y = Math.random() * 20;
          node.size = 10;
          node.color = '#008cc2';
        });
        data.edges.forEach((edge: any) => {
          edge.color = '#282c34';
          edge.type = 'line';
          edge.size = 0.1;
        });
        this.drawGraph(data);
      });
  }

  ngOnDestroy(): void {
    if (this.sigma) {
      this.sigma.kill();
    }
  }

  private drawGraph(data: any) {
    const graph = new Graph();
    data.nodes.forEach((node: any) => graph.addNode(node.id, {...node}));
    data.edges.forEach((edge: any) => {
      graph.addEdge(edge.source, edge.target, {...edge});
    });
    if (this.network) {
      this.sigma = new Sigma(graph, this.network.nativeElement);
    }
  }
}
