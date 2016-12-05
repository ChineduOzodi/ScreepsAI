module.exports = function() {
    StructureSpawn.prototype.createCustomCreap =
        function(energy, roleName) {
            var body = [];
            var attack = 80;
            var move = 50;
            var work = 100;
            var carry = 50;
            var roles = {role: roleName, task: undefined};

            if (roleName == 'harvester' && this.memory.spawnContainerID){
                var numberOfParts = Math.floor((energy /( work + carry + carry + carry + move + move + move)));
                if (numberOfParts == 0){
                    body.push(WORK);
                    body.push(CARRY);
                    body.push(MOVE);
                }
                else{
                    for (let i = 0; i < numberOfParts; i++){
                        body.push(WORK);
                        body.push(CARRY);
                        body.push(CARRY);
                        body.push(CARRY);
                        body.push(MOVE);
                        body.push(MOVE);
                        body.push(MOVE);
                    }
                }
            }
            else if (roleName == 'carrier' && this.memory.spawnContainerID){
                var numberOfParts = Math.floor((energy /(carry + carry + move)));

                if (numberOfParts == 0){
                    body.push(CARRY);
                    body.push(MOVE);
                }
                else{
                    for (let i = 0; i < numberOfParts; i++){
                        body.push(CARRY);
                        body.push(CARRY);
                        body.push(MOVE);
                    }
                }

                //roles.('carrying',false);
            }
            else if (roleName == 'attacker'){
                var numberOfParts = Math.floor((energy / ( attack + attack + work + carry + move + move)));

                if (numberOfParts == 0){
                    body.push(ATTACK);
                    body.push(WORK);
                    body.push(CARRY);
                    body.push(MOVE);
                }
                for (let i = 0; i < numberOfParts; i++){
                    body.push(ATTACK);
                    body.push(ATTACK);
                    body.push(WORK);
                    body.push(CARRY);
                    body.push(MOVE);
                    body.push(MOVE);
                }
            }
            else if (roleName == 'farHarvester'){
                var numberOfParts = Math.floor((energy / ( work + work + work + carry + move + move)));

                if (numberOfParts == 0){
                    body.push(WORK);
                    body.push(WORK);
                    body.push(CARRY);
                    body.push(MOVE);
                }
                for (let i = 0; i < numberOfParts; i++){
                    body.push(WORK);
                    body.push(WORK);
                    body.push(WORK);
                    body.push(CARRY);
                    body.push(MOVE);
                    body.push(MOVE);
                }
                var storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE);
                    }
                });
                if (storage){
                    roles = {role: roleName, task: undefined, harvesting: false, toFlag: false, storageID: storage.id };
                }
                else {
                    var container = this.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER);
                        }
                    });
                    roles = {role: roleName, task: undefined, harvesting: false, toFlag: false, storageID: container.id };
                }

            }
            else{
                var numberOfParts = Math.floor((energy /200));

                for (let i = 0; i < numberOfParts; i++){
                    body.push(WORK);
                    body.push(CARRY);
                    body.push(MOVE);
                }
            }
            this.memory.spawnIndex++;

            //console.log("body:" + body);
            return this.createCreep(body, roleName + '-' + this.memory.spawnIndex, roles);
        }
    StructureSpawn.prototype.createCustomCreap2 =
        function(spawn, energy, roleName,task) {

        if (roleName == 'miner'){
            var numberOfParts = Math.floor((energy /100));

            if (numberOfParts > 7){
                numberOfParts = 7;
            }
            else if (numberOfParts == 1){
                numberOfParts++;
            }
            var body = [];
            for (let i = 0; i < numberOfParts - 1; i++){
                body.push(WORK);
            }
            body.push(MOVE);
            this.memory.spawnIndex++;
            return this.createCreep(body,roleName + '-' + this.memory.spawnIndex, {role: roleName, task: task});
        }
        else{
            var numberOfParts = Math.floor((energy /200));

            var body = [];
            for (let i = 0; i < numberOfParts; i++){
                body.push(WORK);
            }
            for (let i = 0; i < numberOfParts; i++){
                body.push(CARRY);
            }
            for (let i = 0; i < numberOfParts; i++){
                body.push(MOVE);
            }
            this.memory.spawnIndex++;
            return this.createCreep(body, roleName + '-' + this.memory.spawnIndex, {role: roleName});
        }
    }

    StructureSpawn.prototype.setTasks = 
        function () {

            var targets = this.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store[RESOURCE_ENERGY] > 0 && structure.id != this.memory.spawnContainerID;
                }
            });
            var sources = this.room.find(FIND_DROPPED_ENERGY);


            var targetIds = [];
            for (var name in targets){
                var target = targets[name];

                targetIds.push(target.id);
            }
            for (var name in sources){
                var target = sources[name];

                targetIds.push(target.id);
            }
            this.memory.carryTasks = targetIds;
            //console.log(targets.length);

        }

    StructureSpawn.prototype.findMiningContainers =
        function () {

        this.memory.miningContainersID = [];

        var sources = this.room.find(FIND_SOURCES);
        for (var name in sources){

            var source = sources[name];

            var container = source.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => { return s.structureType == STRUCTURE_CONTAINER;}});

            if (container){
                if (source.pos.getRangeTo(container) == 1){
                    this.memory.miningContainersID.push(container.id);
                }
            }
        }

    }
}