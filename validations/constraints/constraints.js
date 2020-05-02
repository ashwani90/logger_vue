const postConstraints = {
    postName: {
        presence: true,
        length: {
            minimum: 1,
            message: "should not be empty"
        }
    },
    timeSpent: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThan: 0,
            lessThanOrEqualTo: 1440,
        }
    },
    taskId: {
        presence: true
    },
    details: {
        presence: true
    },
    status: {
        inclusion: {
            within: {"active":'active', "inactive": 'inactive'},
            message: "Invalid value of status is given"
        }
    }
};

const taskConstraints = {
    taskName: {
        presence: true,
        length: {
            minimum: 1,
            message: 'should not be empty'
        }
    },
    expectedFinishDate: {
        presence: true,
        validateTime: {}
    },
    startDate: {
        presence: true,
        validateTime: {}
    },
    description: {
        presence: true
    },
    details: {
        presence: true
    }
};

const userConstraints = {
    password: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 100,
            message: "should not be empty"
        }
    },
    username: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 100,
            message: "should not be empty"
        }
    },
    email: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 100,
            message: "should not be empty"
        },
        email: true
    },
    firstName: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 100,
            message: "should not be empty"
        }
    },
    lastName: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 100,
            message: "should not be empty"
        }
    },
    status: {
        presence: true,
        inclusion: {
            within: {"active":'active', "inactive": 'inactive'},
            message: "Invalid value of status is given"
        }
    },
    address: {
        validateAddresses: {}
    }
};

const addressConstraints = {
    address1: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 100,
            message: "should not be empty"
        }
    },
    city: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 100,
            message: "should not be empty"
        }
    },
    state: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 100,
            message: "should not be empty"
        }
    },
    country: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 100,
            message: "should not be empty"
        }
    }
};

const timeTableConstraints = {
    timeSlots: {
        presence: {
            allowEmpty: false
        }
    },
    isActive: {
        presence: true,
    },
    description: {
        presence: true
    }
};

module.exports = {
    postConstraints: postConstraints,
    taskConstraints: taskConstraints,
    userConstraints: userConstraints,
    addressConstraints: addressConstraints
};