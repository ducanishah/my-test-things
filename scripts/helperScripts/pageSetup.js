import { TestObject, Tree, Goblin } from "../actors.js"
import { displaySelectedActor, keydownHandler, addActorHandler, selectActorHandler, executeMoveQueueHandler } from "./inputsHandlers.js"


export function addBasicEventListeners() {
    document.addEventListener("keydown", keydownHandler);
    //for adding actors from the selected cell menu
    document.getElementById("addActorButton").addEventListener("click", addActorHandler);
    //for selecting an actor from the selected cell menu
    document.getElementById("cellContents").addEventListener("click", selectActorHandler);
    document.getElementById("executeMoveQueueButton").addEventListener("click", executeMoveQueueHandler);
}

export function spawnInitialActors(worldMap) {
    displaySelectedActor(new TestObject(worldMap, 15, 15));
    new Tree(worldMap, 0, 0)
}

//populates the addActorSelector with the given list of actors
export function populateAddActorList(actorList) {
    let addActorOptions = []
    Object.keys(actorList).forEach((key) => {
        let newActorOption = document.createElement("option");
        newActorOption.innerHTML = key;
        addActorOptions.push(newActorOption);
    })
    document.getElementById("addActorSelector").append(...addActorOptions);
}