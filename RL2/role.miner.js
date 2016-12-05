var roleMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var target = Game.getObjectById(creep.memory.task);
        //console.log("target:" + target);
        if (target) {

            if (creep.pos.getRangeTo(target) == 0){
                var source = creep.pos.findClosestByRange(FIND_SOURCES);
                creep.harvest(source);
            }
            else {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleMiner;