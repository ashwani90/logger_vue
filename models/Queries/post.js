const Post = require("../posts");

const getTotalTimeSpent = async (taskId) => {
    let postTotal = Post.aggregate([
        {
            $group: {
                _id: {task: taskId},
                total: {
                    $sum: "$timeSpent"
                }
            }
        }
    ]);
    return postTotal.total;
};

module.exports = {
    getTotalTimeSpent: getTotalTimeSpent
};