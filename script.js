function countEvens(array){

    let count = 0;

    if(array.length() < 1) {
        return 0;
    }
    
    for(let i = 0; i < array.length(); i++) {

        if(array[i] % 2 == 0) {
            count++;
        }

    }

    return count;

}