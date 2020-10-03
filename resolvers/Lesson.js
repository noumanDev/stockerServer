

function postedBy(parent, args, context) {
    return context.prisma.lesson.findOne({
        where: { id: parent.id }
    }).postedBy();
}
function multimedia(parent, args, context) {
    return context.prisma.lesson.findOne({
        where: {
            id: parent.id
        }
    }).multimedia();
}

module.exports = {
    postedBy,
    multimedia
}