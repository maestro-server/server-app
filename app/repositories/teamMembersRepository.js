'use strict';

import TeamDao from './daos/team';
import validAccess from './validators/validAccess';

import filledTransform from './transforms/filledTransform';
import merger from './transforms/mergeTransform';

import formatRefsCollection from './format/formatRefsCollection';
import formatDelCollection from './format/formatDelCollection';


class TeamMembersRepository {

    /**
     *
     * filled = fields usgin to create a new entiti
     * resFilled = fields with show to result
     */
    constructor(resFilled=null, filled=null) {
        this.setFilled(filled || ['id', 'role']);
    }

    setFilled (val) {
      this.filled = val;
    }



    add (id, member) {

      return new Promise((resolve, reject) => {

          filledTransform(member, this.filled)
              .then((e) => {
                  return validAccess(e);
              })
              .then((e) => {
                  const arr = formatRefsCollection(e.id, 'users', 'members', {role: e.role});

                  return new TeamDao(arr)
                      .updateByPushUnique(id);
              })
              .then((e) => {
                  resolve(e.get('members'))
              })
              .catch((err) => {
                  reject(err);
              });

        });
    }


    remove (id, idu, member) {

        return new Promise((resolve, reject) => {

            const arr = formatDelCollection(idu, 'members');

            new TeamDao(arr)
                .updateByPull(id)
                .then((e) => {
                    resolve(e.get())
                })
                .catch((err) => {
                    reject(err);
                });

        });
    }

}

module.exports = TeamMembersRepository;
