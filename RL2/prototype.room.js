module.exports = function() {
    Room.prototype.createBuildRepairTask =
        function(energy, roleName) {
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

            return this.createCreep(body, undefined, {role: roleName});
        }
    StructureSpawn.prototype.createCustomCreap =
        function(spawn, energy, roleName,targetPos) {

        if (roleName == 'miner'){
            var numberOfParts = Math.floor((energy /100));

            var body = [];
            for (let i = 0; i < numberOfParts - 1; i++){
                body.push(WORK);
            }
            body.push(MOVE);

            return this.createCreep(body, undefined, {role: roleName, targetPos: targetPos});
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

            return this.createCreep(body, undefined, {role: roleName});
        }
    }
}