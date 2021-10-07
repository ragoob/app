import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/dashboard',
    icon: 'icon-dashboard'
  },
  {
    name: 'connections',
    url: '/icons',
    icon: 'fa fa-cloud',
    badge: {
      text: '',
      variant: 'primary',
      class: '',
    },
    children: [
     
    ]
  },
  {
    name: 'multi-cluster',
    url: '/multi-cluster',
    icon: 'fa fa-globe',
  },

  {
    name: 'Management',
    url: '/managment',
    icon: 'icon-settings',
    children: [
      {
        name: 'users',
        url: '/managment/users',
        icon: 'icon-user'
      },
      {
        name: 'clusters',
        url: '/managment/clusters',
        icon: 'icon-bell'
      }
    ]
  }
];

