interface SigmaNode {
  id: string;
  label: string;
  href: string;
  x?: number;
  y?: number;
}

interface SigmaEdge {
  id: number;
  source: string;
  target: string;
}

interface QueueNode {
  name: string;
  parentX: number;
  parentY: number;
}
