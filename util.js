module.exports.gatherUniqueNameInformation = (data) => {
    let fullNameMap = {};       // holds full name combination and occurence number
    let firstNameMap = {};      // holds first names and occurence number
    let lastNameMap = {};       // holds last names and occurence number
    let fullyUniqueName = [];   // holds a list of fully unique last, first combination

    let lastNameIndex = 0;
    let firstNameIndex = 1;

    // Iterate over every row of the file provided
    data.forEach((row, i) => {
        // check here if it is an indented row or an empty end of file row
        if (row[0] != ' ' && row[0] != '') {

            // parse our row for the name information 

            let fullName = row.split('--')[0].trim();
            let lastNameFirstName = fullName.split(',');

            let lastName = lastNameFirstName[lastNameIndex].trim();
            let firstName = lastNameFirstName[firstNameIndex].trim();

            // handle fully unique name where a first or last name cannot have occurred at all
            if (lastNameMap[lastName] === undefined && firstNameMap[firstName] === undefined) {
                if (fullyUniqueName.length < 25) {
                    fullyUniqueName.push(fullName);
                }
            }

            // handle unique full name
            if (fullNameMap[fullName] === undefined && fullName !== '') {
                fullNameMap[fullName] = 1;
            } else if (fullNameMap[fullName] !== undefined && fullName !== '') {
                fullNameMap[fullName] += 1;
            }

            // handle first name
            if (firstNameMap[firstName] === undefined && firstName !== '') {
                firstNameMap[firstName] = 1;
            } else if (firstNameMap[firstName] !== undefined && firstName !== '') {
                firstNameMap[firstName] += 1;
            }

            // handle last name
            if (lastNameMap[lastName] === undefined && lastName !== '') {
                lastNameMap[lastName] = 1;
            } else if (lastNameMap[lastName] !== undefined && lastName !== '') {
                lastNameMap[lastName] += 1;
            }
        }
    });

    return {
        uniqueFullName: fullNameMap,
        uniqueFirstName: firstNameMap,
        uniqueLastName: lastNameMap,
        uniqueFullNameCount: Object.keys(fullNameMap).length,
        uniqueFirstNameCount: Object.keys(firstNameMap).length,
        uniqueLastNameCount: Object.keys(lastNameMap).length,
        first25TrueUniqueName: fullyUniqueName
    };
};

module.exports.getTop10FirstNames = (firstNames) => {
    return Object.keys(firstNames)
        .map((_key) => {
            return {
                name: _key,
                count: firstNames[_key]
            };
        })
        .sort((a, b) => a.count - b.count)
        .reverse()
        .slice(0, 10)
        .map((obj) => {
            return `${obj.name} (${obj.count})`;
        });
};

module.exports.getTop10LastNames = (lastNames) => {
    return Object.keys(lastNames)
        .map((_key) => {
            return {
                name: _key,
                count: lastNames[_key]
            };
        })
        .sort((a, b) => a.count - b.count)
        .reverse()
        .slice(0, 10)
        .map((obj) => {
            return `${obj.name} (${obj.count})`;
        });
};