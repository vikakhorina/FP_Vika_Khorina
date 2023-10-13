class Pacient {
    fName;
    lname;
    age;

    medicines;
    doctors;
    analyzes;

    constructor(fName, lname, age) {
        this.fName = fName;
        this.lname = lname;
        this.age = age;

        this.medicines = [];
        this.doctors = [];
        this.analyzes = [];
    }
}

class Analyze {
    title;
    value;

    constructor(title, value) {
        this.title = title;
        this.value = value;
    }
}

class Doctor {
    fName;
    lname;
    profile;
    experience;

    constructor(fName, lname, profile, experience) {
        this.fName = fName;
        this.lname = lname;
        this.profile = profile;
        this.experience = experience;
    }
}

class Medicines {
    name;
    dose;

    constructor(name, dose) {
        this.name = name;
        this.dose = dose;
    }
}