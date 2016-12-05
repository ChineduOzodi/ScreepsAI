module.exports = function() {
    Creep.prototype.findTask =
        function() {
        if (this.memory.role == 'carrier'){
            var task = undefined;
            for (var name in Game.spawns['Spawn1'].memory.carryTasks){
                var possibleTask =  Game.spawns['Spawn1'].memory.carryTasks[name];
                var taken = false;

                for (var name in Game.creeps) {
                    var creep = Game.creeps[name];

                    if (creep.memory.task != undefined && creep.memory.task == possibleTask && creep.memory.role == this.memory.role){
                        taken = true;
                        break;
                    }

                }
                if (!taken){
                    task = possibleTask;
                    //console.log("For " + this.name +", Found Task: " + task );
                    break;
                }
                else {
                    //console.log("For " + this.name +", Taken: " + possibleTask);
                }
            }
            this.memory.task = task;
        }
        }

}