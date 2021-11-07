var numArray = [];
var arraySum = 0;
var arrayAverage = 0;

function averageArrayElements(){
   var arrayLength = Math.floor(Math.random()*99);
    for (var i = 0; i < arrayLength; i++){
        var arrayElement = Math.floor(Math.random()*arrayLength);
        numArray[i].push(arrayElement);
    }

    console.log(numArray);

    for (var i = 0; i < numArray.length; i++){
        var arraySum = numArray[i] + arraySum;
    }

    arrayAverage = arraySum / numArray.length;

    console.log(arrayAverage);
}

averageArrayElements();
