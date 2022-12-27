// 图
const { Dictionary } = require('../charpter_8/1');
const { Queue } = require('../charpter_5/1');
const { Stack } = require('../charpter_4/1');
class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = [];
    this.adjList = new Dictionary();
  }

  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v).push(w);
    if (!this.isDirected) {
      this.adjList.get(w).push(v);
    }
  }

  getVertices() {
    return this.vertices;
  }

  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = '';
    this.vertices.forEach(item => {
      s += `${item} -> `;
      const neighbors = this.adjList.get(item);
      neighbors.forEach(jtem => {
        s += `${jtem} `;
      });
      s += '\n';
    });
    return s;
  }
}
const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
};

const initializeColor = vertices => {
  const color = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
};

const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();
  queue.enqueue(startVertex);
  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    color[u] = Colors.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        queue.enqueue(w);
      }
    }
    color[u] = Colors.BLACK;
    if (callback) {
      callback(u);
    }
  }
};

const printVertext = value => console.log(`Visited vertex: ${value}`);

const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();
  const distances = {};
  const predecessors = {};
  queue.enqueue(startVertex);
  vertices.forEach(item => {
    distances[item] = 0;
    predecessors[item] = null;
  });
  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    color[u] = Colors.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        distances[w] = distances[u] + 1;
        predecessors[w] = u;
        queue.enqueue(w);
      }
    }
    color[u] = Colors.BLACK;
  }
  return {
    distances,
    predecessors
  };
};

const depthFirstSearch = (graph, callback) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, adjList, callback);
    }
  }
};

const depthFirstSearchVisit = (u, color, adjList, callback) => {
  color[u] = Colors.GREY;
  if (callback) {
    callback(u);
  }
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if ((color[w] = Colors.WHITE)) {
      depthFirstSearchVisit(w, color, adjList, callback);
    }
  }
  color[u] = Colors.BLACK;
};

const DFS = graph => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const [d = {}, f = {}, p = {}, time = { count: 0 }] = [];
  for (let i = 0; i < vertices.length; i++) {
    d[vertices[i]] = 0;
    d[vertices[i]] = 0;
    p[vertices[i]] = null;
  }

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      DFSVisit(vertices[i], color, d, f, p, time, adjList);
    }
  }

  return {
    discovery: d,
    finished: f,
    predecessors: p
  };
};

const DFSVisit = (u, color, d, f, p, time, adjList) => {
  color[u] = Colors.GREY;
  d[u] = ++time.count;
  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      p[w] = u;
      DFSVisit(w, color, d, f, p, time, adjList);
    }
  }
  color[u] = Colors.BLACK;
  f[u] = ++time.count;
};

const graph = new Graph();

const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

myVertices.forEach(item => {
  graph.addVertex(item);
});
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
// console.log(graph.getVertices());
// console.log(graph.getAdjList());
// console.log(graph.getAdjList().table);
// console.log(graph.getAdjList().table.A);
// console.log(graph.toString());
// breadthFirstSearch(graph, myVertices[0], printVertext);
// console.log(BFS(graph, myVertices[1]));
const fromIndex = Math.floor(Math.random() * myVertices.length);
const fromKey = myVertices[fromIndex];
const shortestPathA = BFS(graph, myVertices[fromIndex]);
console.log(`fromIndex===${fromIndex}, fromKey===${fromKey}`);
console.log(shortestPathA);
const fromVertex = myVertices[fromIndex]; // {9}
for (let i = 0; i < myVertices.length; i++) {
  if (i === fromIndex) {
    continue;
  }
  // {10}
  const toVertex = myVertices[i]; // {11}
  const path = new Stack(); // {12}
  for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    // {13}
    path.push(v); // {14}
  }
  path.push(fromVertex); // {15}
  let s = path.pop(); // {16}
  while (!path.isEmpty()) {
    // {17}
    s += ' - ' + path.pop(); // {18}
  }
  console.log(s); // {19}
}

depthFirstSearch(graph, printVertext);
console.log(DFS(graph));
