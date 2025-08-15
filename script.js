function countEvens(array){

    let count = 0;

    if(array.length < 1) {
        return 0;
    }
    
    for(let i = 0; i < array.length; i++) {

        if(array[i] % 2 == 0) {
            count++;
        }

    }

    return count;

}


function maxBlock(s) {

    let largestBlock = 0;
    
    for(let i = 0; i < s.length; i++){

        let inChain = true;
        let j = 0;

        while(inChain){

            inChain = s.substring(i, i+1).equals(s.substring(i+j, i+j+1));
            
            j++;
            
            console.log(j + " " + s.substring(i, i+1) + " " + s.substring(i+j, i+j+1));

        }

        if(j>largestBlock) largestBlock = j;

    }

    return largestBlock;

}