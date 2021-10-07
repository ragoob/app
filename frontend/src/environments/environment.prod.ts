export const environment = {
  production: true,
  baseUrl: 'API_URL',
  ws: 'SOCKET_URL',
  api: {
    k8s: '/connections',
    auth: '/auth',
    clusters: '/clusters',
    nameSpaces: '/namespaces',
    nodes: '/nodes',
    deployments: '/deployments',
    services: '/services',
    pods: '/pods',
    ingresses: '/ingress',
    secrets: '/secrets',
    events: '/events',
    users: '/users',
  },
  sockets: {
      health: '/healthaknowlegment',
      monitoring: "/monitoring",
      outbound: "/outbound"
  }
};
