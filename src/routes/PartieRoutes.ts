import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import PartieService from '@src/services/PartieService';
import { IPartie } from '@src/models/Partie';
import { IReq, IRes } from './types/express/misc';

// ... Autres imports ...

// **** Functions **** //

/**
 * Lire toutes les parties.
 */
async function getAll(_: IReq, res: IRes) {
  const parties = await PartieService.getAll();
  return res.status(HttpStatusCodes.OK).json({ parties });
}

async function getAllSortedByPoints(_: IReq, res: IRes) {
  const parties = await PartieService.getAllSortedByPoints();
  return res.status(HttpStatusCodes.OK).json({ parties });
}

async function getAllSortedByDate(_: IReq, res: IRes) {
  const parties = await PartieService.getAllSortedByDate();
  return res.status(HttpStatusCodes.OK).json({ parties });
}

async function getById(req: IReq, res: IRes) {
  const id = req.params.id;
  const partie = await PartieService.getById(id);

  if (partie) {
    return res.status(HttpStatusCodes.OK).json({ partie });
  } else {
    return res.status(HttpStatusCodes.NOT_FOUND).json({ message: 'Partie not found' });
  }
}


/**
 * Ajouter une partie.
 */
async function add(req: IReq<{ partie: IPartie }>, res: IRes) {
  let { partie } = req.body;
  partie = await PartieService.addOne(partie);
  return res.status(HttpStatusCodes.CREATED).json({ partie });
}

/**
 * Mise à jour d'une partie.
 */
async function update(req: IReq<{ partie: IPartie }>, res: IRes) {
  let { partie } = req.body;
  partie = await PartieService.updateOne(partie);
  return res.status(HttpStatusCodes.OK).json({ partie });
}

/**
 * Supprimer une partie.
 */
async function delete_(req: IReq, res: IRes) {
  const id = req.params.id;
  await PartieService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

// ... Autres fonctions ...

// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
  getById,
  getAllSortedByPoints,
  getAllSortedByDate,
} as const;
