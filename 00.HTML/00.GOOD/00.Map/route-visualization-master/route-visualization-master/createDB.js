const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');


function readDirectory(directory) {
    return new Promise((resolve, reject) => fs.readdir(directory, (err, files) => {
        if (err)
            reject(err);
        else {
            resolve(files);
        }
    }));
}

function readDataEntry(fileName) {
    const entryPath = path.resolve(__dirname, `trips/${fileName}`);

    return new Promise((resolve, reject) => fs.readFile(entryPath, 'utf8', (err, data) => {
        if (err)
            reject(err);
        else
            resolve(JSON.parse(data));
    }));
}

MongoClient.connect('mongodb://localhost:27017/comma_trips', { useNewUrlParser: true }, (err, client) => {
    // Client returned
    var db = client.db('comma_trips');

    readDirectory(path.resolve(__dirname, 'trips/'))
        //read all files in the data folder
        .then(files => Promise.all(files.map(file => readDataEntry(file)
            .then(async data => {
                const {
                    start_time,
                    coords,
                    end_time
                } = data;
                db.collection('trips', function (err, collection) {
                    if(err) return;
                    try {
                        collection.insertOne({
                            start_time: new Date(start_time),
                            end_time: new Date(end_time)
                        });
                    } catch (e) {
                        print(e);
                    }
                });

                db.collection('points', function(err, collection){
                    if(err) return;
                    try {
                        const entries = coords.map(coord => ({
                            start_time: new Date(`${start_time}`),
                            end_time: new Date(`${end_time}`),
                            lat: Number(`${coord.lat}`),
                            lng: Number(`${coord.lng}`),
                            speed: Number(`${coord.speed}`)
                        }));

                        console.log(`Inserting record for ${start_time} into the points collection.`)
        
                        collection.insert(entries)
                        
                    } catch(e){
                        console.log(e)
                    }
                })
            })
    )));

});