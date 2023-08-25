interface SigmaNode {
  id: number;
  label: string;
  href: string;
  x?: number;
  y?: number;
}

interface SigmaEdge {
  id: number;
  source: number;
  target: number;
}

interface QueueNode {
  id: number;
  parentX: number;
  parentY: number;
}
