import {Partie, IPartie } from '@src/models/Partie';
import { connect } from 'mongoose';

// **** Functions **** //

/**
 * Lire une partie.
 */
async function getById(id: string): Promise<IPartie | null> {
  return Partie.findOne({ _id: id }).exec();
}

async function getAllSortedByPoints(): Promise<IPartie[]> {
  return Partie.find().sort({ point: -1 }).exec();
}


/**
 * Vérifie si la partie existe.
 */
async function persists(id: string): Promise<boolean> {
  const partie = Partie.findById(id);

  return partie !== null;
}

/**
 * Lire toutes les parties.
 */
async function getAll(): Promise<IPartie[]> {
  try {
    await connect(process.env.MONGODB_URI!);
    // Récupérer toutes les parties depuis la base de données
    const parties = await Partie.find();

    // Ajouter un journal pour voir les parties récupérées
    console.log('Parties récupérées avec succès dans PartieRepo.getAll :', parties);

    return parties;
  } catch (error) {
    // Gérer les erreurs, par exemple, journaliser l'erreur
    console.error('Erreur lors de la récupération des parties dans PartieRepo.getAll :', error);
    throw error;
  }
}

/**
 * Ajouter une partie.
 */
async function add(partie: IPartie): Promise<IPartie> {
  const nouvellePartie = new Partie(partie);
  await nouvellePartie.save();
  return nouvellePartie;
}

/**
 * Mettre à jour une partie.
 */
async function update(partie: IPartie): Promise<IPartie> {
  const partieToUpdate = await Partie.findById(partie._id);
  if (partieToUpdate === null) {
    throw new Error('Partie non trouvée');
  }
  // Mettez à jour les propriétés nécessaires en fonction de votre modèle
  partieToUpdate.nom_joueur = partie.nom_joueur;
  partieToUpdate.point = partie.point;
  partieToUpdate.date_partie = partie.date_partie;
  partieToUpdate.partie_gagnee = partie.partie_gagnee;
  partieToUpdate.details_partie = partie.details_partie;

  await partieToUpdate.save();
  return partieToUpdate;
}

/**
 * Supprimer une partie.
 */
async function delete_(id: string): Promise<void> {
  await Partie.findByIdAndDelete(id);
}

Partie.find()
  .then((parties) => {
    console.log('Parties récupérées:', parties);
  })
  .catch((error) => {
    console.error('Erreur lors de la récupération des parties:', error);
  });

// **** Export default **** //

export default {
  getById,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
  getAllSortedByPoints,
} as const;
