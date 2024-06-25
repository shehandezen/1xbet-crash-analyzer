
// Calculate Key Metrics
const calculateMetrics = (crashPoints) => {
    const sum = crashPoints.reduce((a, b) => a + b, 0);
    const average = sum / crashPoints.length;
    const lowCrashes = crashPoints.filter(point => point <= 1.5);
    const highCrashes = crashPoints.filter(point => point >= 8.0);
    return { average, lowCrashes, highCrashes };
}

// Identify Repeating Values
const findRepeatingValues = (crashPoints) => {
    const repeatingValues = {};
    const uniquePoints = new Set(crashPoints);
    uniquePoints.forEach(point => {
        const count = crashPoints.filter(p => p === point).length;
        if (count > 1) {
            repeatingValues[point] = count;
        }
    });
    return repeatingValues;
}

// Sequence and Alternation Detection
const detectAlternatingPatterns = (crashPoints) => {
    const alternatingPatterns = [];
    for (let i = 1; i < crashPoints.length; i++) {
        if ((crashPoints[i] <= 1.5 && crashPoints[i - 1] >= 8.0) || (crashPoints[i] >= 8.0 && crashPoints[i - 1] <= 1.5)) {
            alternatingPatterns.push([crashPoints[i - 1], crashPoints[i]]);
        }
    }
    return alternatingPatterns;
}



// Cluster Detection
const detectClusters = (crashPoints) => {
    const highCluster = crashPoints.filter(point => point >= 8.0);
    const lowCluster = crashPoints.filter(point => point <= 1.5);
    return { highCluster, lowCluster };
}


// Generate Predictions
const predictCrashPoints = (recentPoints) => {
    const { average, lowCrashes, highCrashes } = calculateMetrics(recentPoints);
    const repeatingValues = findRepeatingValues(recentPoints);
    const alternatingPatterns = detectAlternatingPatterns(recentPoints);
    const prediction = [];
        if (lowCrashes.length > highCrashes.length) {
            prediction.push(parseFloat((Math.random() * (2.5 - 1.0) + 1.0).toFixed(2)));
        } else  if (lowCrashes.length < highCrashes.length) {
            prediction.push(parseFloat((Math.random() * (10.0 - 2.5) + 2.5).toFixed(2)));
        }
        return prediction[0] 
}

// calculate error percentage
// const meanAbsolutePercentageError = (actual, predicted) => {
//     if (actual.length !== predicted.length) {
//         throw new Error('Arrays must be of the same length');
//     }

//     const totalPercentageError = actual.reduce((sum, value, index) => {
//         return sum + Math.abs((predicted[index] - value) / value);
//     }, 0);

//     return (totalPercentageError / actual.length) * 100;
// }


const predictor = async (data) => {
    const { average, lowCrashes, highCrashes } = await calculateMetrics(data);
    console.log(`Average: ${average}`);
    console.log(`Low Crashes: ${JSON.stringify(lowCrashes)}`);
    console.log(`High Crashes: ${JSON.stringify(highCrashes)}`);

    const repeatingValues = await findRepeatingValues(data);
    console.log(`Repeating Values: ${JSON.stringify(repeatingValues)}`);

    const alternatingPatterns = await detectAlternatingPatterns(data);
    console.log(`Alternating Patterns: ${JSON.stringify(alternatingPatterns)}`);

    const { highCluster, lowCluster } = await detectClusters(data);
    console.log(`High Cluster: ${JSON.stringify(highCluster)}`);
    console.log(`Low Cluster: ${JSON.stringify(lowCluster)}`);

    const predictions = await predictCrashPoints(data);
    console.log(`Predicted Crash Point: ${JSON.stringify(predictions)}`);
    return predictions
    
}


module.exports =  predictor
