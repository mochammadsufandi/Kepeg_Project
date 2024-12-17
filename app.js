// sort element of array

const sortArray = (array) => {

    for(let i=0; i<array.length; i++) {
        for(let j=0; j<array.length; j++) {
            if(array[j] > array[j+1]) {
                const saveElement = array[j];
                array[j] = array[j+1];
                array[j+1] = saveElement
            }
        }
    }
    return array;
}

const array = [2,4,1,5,3,10,7,9,6,8];
const result = sortArray(array)
console.log(result)