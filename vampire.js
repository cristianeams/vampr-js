class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;

  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    //climb up tree
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
   return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if(name === this.name) {
      return this;
    }
    for (let vampire of this.offspring) {
      let found = vampire.vampireWithName(name);
      if (found) {
        return found;
      } 
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let sumOfVamps = 0;
    for (let vampire of this.offspring) {
      sumOfVamps += vampire.totalDescendents +1 ;
    }
    return sumOfVamps;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenialVamps = [];
    if(this.yearConverted > 1980) {
      millenialVamps.push(this);
    }
    for(let vampire of this.offspring) {
      const vampiresThatAreMillenials = vampire.allMillennialVampires;
      millenialVamps = millenialVamps.concat(vampiresThatAreMillenials);
    }
    return millenialVamps;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    
  }
}

const original = new Vampire ('Original', 1200);

const ansel = new Vampire('Ansel', 1800);
const bart = new Vampire('Bart', 1810);
const rebeca = new Vampire('Rebeca', 1850);

original.addOffspring(ansel);
original.addOffspring(bart);
original.addOffspring(rebeca);

const elgort = new Vampire('Elgort', 1860);
const sarah = new Vampire('Sarah', 1880);

ansel.addOffspring(elgort);
ansel.addOffspring(sarah);

const andrew = new Vampire('Andrew', 1920);

elgort.addOffspring(andrew);


module.exports = Vampire;



