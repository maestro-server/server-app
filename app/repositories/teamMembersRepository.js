'use strict';

import TeamDao from './daos/team';
import validAccess from './validators/validAccess';

import filledTransform from './transforms/filledTransform';
import merger from './transforms/mergeTransform';


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

      //        let member = { $push: { <field1>: <value1>, ... } };
      return new Promise((resolve, reject) => {

          filledTransform(member, this.filled)
              .then((e) => {
                  return validAccess(e);
              })
              .then((e) => {
                  let arr = {members: [e]};

                  console.log(arr);
                  return new TeamDao(arr)
                      .updateByPush(id);
              })
              .then((e) => {
                  return filledTransform(e.get(), this.resFilled);
              })
              .then((e) => {
                  resolve(e)
              })
              .catch((err) => {
                  reject(err);
              });

        });
    }



}

module.exports = TeamMembersRepository;
