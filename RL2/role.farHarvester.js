var roleDistanceHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
            creep.say('delivering');
        }
        if(!creep.memory.harvesting && creep.carry.energy == 0 && creep.memory.toFlag == false) {

            creep.memory.toFlag = true;
            var flag = Game.flags['Flag1'];

            creep.memory.path = creep.pos.findPathTo(flag.pos);

        }
        var storage = Game.getObjectById(creep.memory.storageID);
        //console.log(storage.id);
        if (creep.memory.toFlag){

            var flag = Game.flags['Flag1'];
            if (creep.pos.getRangeTo(flag.pos) <= 1){
                creep.memory.toFlag = false;

                var source = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: (source) => {
                        return source.energy > 0;
                    }
                });
                if (source) {
                    creep.memory.path = creep.pos.findPathTo(source);
                    creep.memory.targetID = source.id;
                    creep.memory.harvesting = true;
                    creep.say('harvesting');
                }
                else {
                    creep.say('no source');
                }
            }
            else {
                creep.moveTo(flag.pos);
            }


        }
        
        else if (creep.memory.harvesting){
            var target = Game.getObjectById(creep.memory.targetID);

            if (creep.pos.getRangeTo(target) <= 1){
                creep.harvest(target);
            }
            else {
                creep.moveByPath(creep.memory.path);
            }

        }
        else {
            var target = Game.getObjectById(creep.memory.storageID);
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
};

module.exports = roleDistanceHarvester;