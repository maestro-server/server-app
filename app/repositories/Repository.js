'use strict';


class Repository {


    setFilled(val) {
        this.filled = val;
        return this;
    }

    excludeFilled(val) {
        this.setFilled(
            this.filled.filter((e) => e != val)
        );

        return this;
    }

    setResFilled(val) {
        this.resFilled = val;
        return this;
    }

}

module.exports = Repository;
