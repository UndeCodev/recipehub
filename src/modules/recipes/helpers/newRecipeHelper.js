export const addElement = (array, placeholder) => {
  array.push({
    placeholder,
    text: null,
  });
};

export const removeElement = (array, index) => {
  if (array.length === 1) return;
  else array.splice(index, 1);
};


export const calculateTotalTime = (times) => {
    if(!Array.isArray(times)) return 'El parámetro de times debe de ser una arreglo de objetos';
    
    const conversion = {
        minutos: 1,
        horas: 60,
        días: 1440
    }

    let totalTime = 0
    
    for (const { time, timeUnits } of times) {
        totalTime += time * conversion[timeUnits]
    }
    
    const days = Math.floor(totalTime / conversion.días)
    const hours = Math.floor((totalTime % conversion.días) / conversion.horas)
    const minutes = (totalTime % conversion.días) % conversion.horas
    
    return formatTime(days, hours, minutes) || 0
}
        
export const formatTime = (days, hours, minutes) => {
   const timeUnits = [
      { value: days, unit: "días" },
      { value: hours, unit: "horas" },
      { value: minutes, unit: "minutos" }
    ];
 
    const nonZeroUnits = timeUnits.filter(({ value }) => value > 0);
    const formattedUnits = nonZeroUnits.map(({ value, unit }) => `${value} ${unit}`);
   
    let result = formattedUnits.join(", ");
    const lastCommaIndex = result.lastIndexOf(",");

    if (lastCommaIndex !== -1) {
      result = result.slice(0, lastCommaIndex) + " y" + result.slice(lastCommaIndex +1);
    }

    return result
}

export const formatVideoURL = (videoURL) => {
    if(!videoURL || videoURL.length < 5) return

    const videoId = videoURL.split('v=')[1] || videoURL.split('/embed/')[1];

    if(videoId) return { ok: true, validUrl: `https://www.youtube.com/embed/${videoId}` }
    else return{ ok: false }   
}
