import { NextFunction, Request, Response, Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import PartieRoutes from './PartieRoutes'; // Updated import
import {Partie, IPartie } from '@src/models/Partie'; // Updated import
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// ** Validation d'une partie ** //
async function validatePartie(req: Request, res: Response, next: NextFunction) {
  try {
    const nouvellePartie = await Partie.create(req.body);
    next();
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).send(error).end();
  }
}

// ** Ajoute PartieRouter ** //

const partieRouter = Router(); // Updated variable

// Ajout de la route pour lire une partie par ID
partieRouter.get(Paths.Parties.GetById, PartieRoutes.getById); // Ajout de la nouvelle route

// Lire toutes les parties
partieRouter.get(Paths.Parties.GetAll, PartieRoutes.getAll);

// Ajouter une partie
partieRouter.post(Paths.Parties.Add, validatePartie, PartieRoutes.add); // Updated path and validation function

// Mettre à jour une partie
partieRouter.put(Paths.Parties.Update, validatePartie, PartieRoutes.update); // Updated path and validation function

partieRouter.get(Paths.Parties.GetSortedByPoints, PartieRoutes.getAllSortedByPoints); // Nouvelle route

partieRouter.get(Paths.Parties.GetSortedByDate, PartieRoutes.getAllSortedByDate);


// Supprimer une partie
partieRouter.delete(
  Paths.Parties.Delete,
  validate(['id', 'string', 'params']),
  PartieRoutes.delete
);

// Add PartieRouter
apiRouter.use(Paths.Parties.Base, partieRouter); // Updated path

// **** Export default **** //

export default apiRouter;
