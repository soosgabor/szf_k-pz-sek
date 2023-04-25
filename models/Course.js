const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Missing title']
    },
    description: {
        type: String,
        required: [true, 'Mising description']
    },
    weeks: {
        type: Number,
        required: [true, 'Missing weeks']
    },
    price: {
        type: Number,
        required: [true, 'Missing price']
    },
    minimumSkill: {
        type: String,
        required: [true, 'Missing minimumSkill']
    },
    training: {
        type: mongoose.Schema.ObjectId,
        ref: 'Training',
        required: true
    },
    user: {
        // user id
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// Statikus metódus az adott képzéshez tartozó kurzusok 
// átlagos költségének kiszámítására
CourseSchema.statics.getAverageCost = async function (trainingId) {
    const obj = await this.aggregate([
        {
            $match: { training: trainingId }
        },
        {
            $group: {
                _id: '$training',
                totalCost: { $sum: '$price' }
            }
        }
    ])
    console.log(obj);
    try {
        await this.model('Training').findByIdAndUpdate(trainingId, {
            totalCost: Math.ceil(obj[0].totalCost / 10) * 10
        })
    } catch (error) {
        console.error(error);
    }


}
// A getAverageCost hívása a mentés(create) után
CourseSchema.post('save', function () {
    this.constructor.getAverageCost(this.training)
})
// A getAverageCost hívása a remove(delete) előtt
CourseSchema.pre('remove', function () {
    this.constructor.getAverageCost(this.training)
})


module.exports = mongoose.model("Course", CourseSchema, "courses");