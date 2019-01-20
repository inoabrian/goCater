const fs = require('fs');
const path = require('path');
const util = require('./util');

fs.readFile(path.join(__dirname, 'test-data-10-exp-5.list'),
    { encoding: 'utf-8' },
    (err, data) => {
        if (!err) {
            let filedata = data.split('\r\n');
            filedata.splice(filedata.length - 1, 1);
            let nameInformation = util.gatherUniqueNameInformation(filedata);

            printQuestion1(nameInformation);
            printQuestion2(nameInformation);
            printQuestion3(nameInformation);
            printQuestion4(nameInformation);
        }
        else {
            console.error(err);
        }
    }
);

function printQuestion1(nameInformation) {
    console.log('\r\n');
    console.group(`*** Question #1 ***`);
    console.log(`Print out the number of unique full names, first names and last names.\r\n`);
    console.log(`Unique Full Name Count: ${nameInformation.uniqueFullNameCount}`);
    console.log(`Unique First Name Count: ${nameInformation.uniqueFirstNameCount}`);
    console.log(`Unique Last Name Count: ${nameInformation.uniqueLastNameCount}`);
    console.groupEnd();
}

function printQuestion2(nameInformation) {
    console.log('\r\n');
    console.group(`*** Question #2 ***`);
    console.log(
        `Print to standard out the 10 most common first names along with the
number of times the name appeared in the file in descending order.
Don't worry about tie scores.\r\n`
    );
    let topTenFirstNames = Object.keys(nameInformation.uniqueFirstName)
        .map((_key) => {
            return {
                name: _key,
                count: nameInformation.uniqueFirstName[_key]
            };
        })
        .sort((a, b) => a.count - b.count)
        .reverse()
        .slice(0, 10)
        .map((obj) => {
            return `${obj.name} (${obj.count})`;
        });

    console.log(topTenFirstNames.join('\r\n'));
    console.groupEnd();
}

function printQuestion3(nameInformation) {
    console.log('\r\n');
    console.group(`*** Question #3 ***`);

    console.log(
        `Print to standard out the 10 most common last names along with the
number of times the name appeared in the file in descending order.
Don't worry about tie scores.\r\n`
    );

    let topTenLastNames = Object.keys(nameInformation.uniqueLastName)
        .map((_key) => {
            return {
                name: _key,
                count: nameInformation.uniqueLastName[_key]
            };
        })
        .sort((a, b) => a.count - b.count)
        .reverse()
        .slice(0, 10)
        .map((obj) => {
            return `${obj.name} (${obj.count})`;
        });

    console.log(topTenLastNames.join('\r\n'));
    console.groupEnd();
}

function printQuestion4(nameInformation) {
    console.log('\r\n');
    console.group(`*** Question #4 ***`);

    console.log(
        `This one is a little more complicated.  The first step is to identify
the first 25 completely unique names in the list.  For example:

Smith, Fred        // Unique!  We haven't seen "Fred" or "Smith" yet
Patel, Fred        // Not unique.  We've seen "Fred"
Patel, Betty       // Not unique.  We've seen "Patel"
Chang, Sarah       // Unique!  We haven't seen "Sarah" or "Chang" yet. \r\n`
    );
    
    console.log(nameInformation.first25TrueUniqueName.join('\r\n'));
}