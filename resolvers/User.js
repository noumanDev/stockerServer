function lessons(parent, args, context) {
    return context.prisma.user.findOne({ where: { id: parent.id } }).lessons();
}

module.exports = {
    lessons
}