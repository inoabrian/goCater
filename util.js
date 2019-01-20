module.exports.gatherUniqueNameInformation = (data) => {
    let fullNameMap = {};
    let firstNameMap = {};
    let lastNameMap = {};
    let fullyUniqueName = [];

    let lastNameIndex = 0;
    let firstNameIndex = 1;

    data.forEach((row, i) => {
        if(row[0] != ' ' && row[0] != '') {
            let fullName = row.split('--')[0].trim();
            let lastNameFirstName = fullName.split(',');

            let lastName = lastNameFirstName[lastNameIndex].trim();
            let firstName = lastNameFirstName[firstNameIndex].trim();

            // handle fully unique name where a first or last name cannot have occurred
            if(lastNameMap[lastName] === undefined && firstNameMap[firstName] === undefined) {
                if(fullyUniqueName.length < 25) {
                    fullyUniqueName.push(fullName);
                }
            }

            // handle unique full name
            if(fullNameMap[fullName] === undefined && fullName !== ''){
                fullNameMap[fullName] = 1;
            } else if(fullNameMap[fullName] !== undefined && fullName !== '') {
                fullNameMap[fullName] += 1;
            }

            // handle first name
            if(firstNameMap[firstName] === undefined && firstName !== '') {
                firstNameMap[firstName] = 1;
            } else if(firstNameMap[firstName] !== undefined && firstName !== '') {
                firstNameMap[firstName] += 1;
            }

            // handle last name
            if(lastNameMap[lastName] === undefined && lastName !== '') {
                lastNameMap[lastName] = 1;
            } else if(lastNameMap[lastName] !== undefined && lastName !== '') {
                lastNameMap[lastName] += 1;
            }
        }
    });

    return {
        uniqueFullName : fullNameMap,
        uniqueFirstName: firstNameMap,
        uniqueLastName: lastNameMap,
        uniqueFullNameCount : Object.keys(fullNameMap).length,
        uniqueFirstNameCount: Object.keys(firstNameMap).length,
        uniqueLastNameCount: Object.keys(lastNameMap).length,
        first25TrueUniqueName: fullyUniqueName
    };
};