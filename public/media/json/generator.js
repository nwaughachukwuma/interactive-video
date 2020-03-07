module.exports = () => {
    const faker = require('faker');

    return {
        comments: (new Array(10).fill(0)).map((_, ix) => {

            let timer = (ix+1)*6
            const minutes = Math.floor(timer / 60);
            const seconds = Math.floor(timer - minutes * 60);

            let minuteValue;
            let secondValue;
            if (minutes < 10) {
                minuteValue = "0" + minutes;
            } else {
                minuteValue = minutes;
            }
            if (seconds < 10) {
                secondValue = "0" + seconds;
            } else {
                secondValue = seconds;
            }
            const mediaTime = minuteValue + ":" + secondValue;

            const comments_data =  {
                text: faker.lorem.sentence(), 
                time: timer,
                mediaTime
            }
            return comments_data;
        })
    }
}