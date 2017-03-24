'use strict';

import ProjectRepository from '../repositories/projectsRepository';
import Promises from 'bluebird';

class ProjectsService {

    static find(query) {

        return new Promise(function(resolve, reject) {

            let limit = parseInt(query.limit) || 20;
            let skip = parseInt(query.skip) || 0;

            let promises = new ProjectRepository()
                .find(query, limit, skip)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }

    static findOne(_id) {
      return new Promise(function(resolve, reject) {

          let promises = new ProjectRepository()
              .findOne({_id})
              .then((result) => {
                  resolve(result);
              })
              .catch((err) => {
                  reject(err);
              });

      });
    }

    static update(_id, project) {

      return new Promise(function(resolve, reject) {

          new ProjectRepository()
              .update(_id, project)
              .then((e) => {
                  resolve(e);
              })
              .catch((err) => {
                  reject(err);
              });

      });
    }

    static remove(_id) {

      return new Promise(function(resolve, reject) {

          let promises = new ProjectRepository()
              .remove(_id)
              .then((result) => {
                  resolve(result);
              })
              .catch((err) => {
                  reject(err);
              });

      });
    }

    static create(project) {

        return new Promise(function(resolve, reject) {

            let promises = new ProjectRepository()
                .create(project)
                .then((e) => {
                    resolve(e);
                })
                .catch((err) => {
                    reject(err);
                });

        });

    }
}

module.exports = ProjectsService;
