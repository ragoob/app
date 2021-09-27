// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8099',
  ws: 'ws://localhost:8099',
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
    events: '/events'
  },
  sockets: {
      health: '/healthaknowlegment',
      monitoring: "/monitoring",
      outbound: "/outbound"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
