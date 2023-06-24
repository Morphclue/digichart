import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Network} from 'vis-network';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss'],
})
export class NetworkComponent implements AfterViewInit {
  @ViewChild('network') el: ElementRef | undefined;
  private network: Network | undefined;

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    const container = this.el?.nativeElement;
    const id = 797; // Jijimon
    this.http.get<any>(`http://localhost:3000/api/v1/${id}`).subscribe(
      (data) => {
        for (const node of data.nodes) {
          // FIXME: only after selection
          if (node.id === id) {
            (node as any).color = '#ff0000';
          }
          (node as any).shape = 'circularImage';
        }

        const options = {
          layout: {
            hierarchical: {
              // TODO  direction: 'LR',
            },
          },
          physics: {
            enabled: false,
          },
        };
        this.network = new Network(container, data, options);
      });
  }
}
