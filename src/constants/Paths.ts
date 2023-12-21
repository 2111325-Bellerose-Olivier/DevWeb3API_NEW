/**
 * Express router paths go here.
 */

export default {
  Base: '/',
  Parties: {
    Base: '/parties',
    GetAll: '/',        // Utilisez GetAll pour la route qui récupère toutes les parties
    GetSortedByPoints: '/sortedByPoints',
    GetSortedByDate: '/sortedByDate',
    GetById: '/id/:id',    // Utilisez GetById pour la route qui récupère une partie par son ID
    Add: '/',
    Update: '/',
    Delete: '/:id',
  },
  Users:{
    Base: '/users',
    GetByName: '/name'
  }
} as const;
