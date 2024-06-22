export function shuffledArray(array){
    const newArray = [];
    let listOfIDs = [];
  
    for(var c = 0; c < array.length; c++){
        let randomId = -1;
        while(randomId === -1){
            randomId = Math.floor(Math.random() * array.length);//get a random number between 0 and the mex length of the array in integer form

            //if chosen id already exists reset it, else assign it to the listOfIDs
            if(listOfIDs.find(item=>(item === randomId)) === undefined){
                listOfIDs.push(randomId);
            }
            else{
                randomId = -1;
            }
        }

        newArray[c] = array[randomId];
    }

    return newArray;
}