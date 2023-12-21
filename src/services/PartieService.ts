import PartieRepo from '@src/repos/PartieRepo';
import { IPartie } from '@src/models/Partie';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

// **** Variables **** //

export const PARTIE_NOT_FOUND_ERR = 'Partie non trouvée';

// **** Functions **** //

/**
 * Lire toutes les parties.
 */
async function getAll(): Promise<IPartie[]> {
  try {
    // Récupérer toutes les parties depuis la base de données
    const parties = await PartieRepo.getAll();

    // Ajouter un journal pour voir les parties récupérées
    console.log('Parties récupérées avec succès dans PartieService.getAll :', parties);

    return parties;
  } catch (error) {
    // Gérer les erreurs, par exemple, journaliser l'erreur
    console.error('Erreur lors de la récupération des parties dans PartieService.getAll :', error);
    throw error;
  }
}

async function getById(id: string): Promise<IPartie | null> {
  return PartieRepo.getById(id);
}

async function getAllSortedByPoints(): Promise<IPartie[]> {
  try {
    // Récupérer toutes les parties triées par points en ordre descendant
    const partiesTriees = await PartieRepo.getAllSortedByPoints();
    return partiesTriees;
  } catch (error) {
    // Gérer les erreurs, par exemple, journaliser l'erreur
    console.error('Erreur lors de la récupération des parties triées par points :', error);
    throw error;
  }
}

async function getAllSortedByDate(): Promise<IPartie[]> {
  try {
    // Récupérer toutes les parties depuis la base de données
    const parties = await PartieRepo.getAll();

    // Tri des parties par date en ordre descendant
    const partiesTriees = parties.sort((a, b) => new Date(b.date_partie).getTime() - new Date(a.date_partie).getTime());

    return partiesTriees;
  } catch (error) {
    // Gérer les erreurs, par exemple, journaliser l'erreur
    console.error('Erreur lors de la récupération des parties triées par date :', error);
    throw error;
  }
}

/**
 * Ajouter une partie.
 */
function addOne(partie: IPartie): Promise<IPartie> {
  return PartieRepo.add(partie);
}

/**
 * Mise à jour d'une partie.
 */
async function updateOne(partie: IPartie): Promise<IPartie> {
  const persists = await PartieRepo.persists(partie._id!);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PARTIE_NOT_FOUND_ERR);
  }
  // Return partie
  return PartieRepo.update(partie);
}

/**
 * Supprimer une partie par son ID.
 */
async function _delete(id: string): Promise<void> {
  const persists = await PartieRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, PARTIE_NOT_FOUND_ERR);
  }
  // Supprimer la partie
  return PartieRepo.delete(id);
}

// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
  getById,
  getAllSortedByPoints,
  getAllSortedByDate,
} as const;
