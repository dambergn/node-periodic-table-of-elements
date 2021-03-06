'use strict'

// https://pubchemdocs.ncbi.nlm.nih.gov/pug-rest-tutorial

// Get Synonyms by Name
// https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/water/synonyms/JSON

// Find CID by name
// https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/water/cids/JSON

// Get 3D image by Name
// https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/water/PNG

// Get info by CID
// https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/962/property/MolecularFormula,MolecularWeight,CanonicalSMILES/JSON
// https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1,2,3,4,5/property/MolecularFormula,MolecularWeight,CanonicalSMILES/JSON
/*Compound Property Tables
# https://pubchemdocs.ncbi.nlm.nih.gov/pug-rest
- MolecularFormula - Molecular formula.
- MolecularWeight - The molecular weight is the sum of all atomic weights of the constituent atoms in a compound, measured in g/mol. In the absence of explicit isotope labelling, averaged natural abundance is assumed. If an atom bears an explicit isotope label, 100% isotopic purity is assumed at this location.
- CanonicalSMILES - Canonical SMILES (Simplified Molecular Input Line Entry System) string.  It is a unique SMILES string of a compound, generated by a “canonicalization” algorithm.
- IsomericSMILES - Isomeric SMILES string.  It is a SMILES string with stereochemical and isotopic specifications.
- InChI - Standard IUPAC International Chemical Identifier (InChI).  It does not allow for user selectable options in dealing with the stereochemistry and tautomer layers of the InChI string.
- InChIKey- Hashed version of the full standard InChI, consisting of 27 characters.
- IUPACName - Chemical name systematically determined according to the IUPAC nomenclatures.
- XLogP - Computationally generated octanol-water partition coefficient or distribution coefficient. XLogP is used as a measure of hydrophilicity or hydrophobicity of a molecule.
- ExactMass - The mass of the most likely isotopic composition for a single molecule, corresponding to the most intense ion/molecule peak in a mass spectrum.
- MonoisotopicMass - The mass of a molecule, calculated using the mass of the most abundant isotope of each element.
- TPSA - Topological polar surface area, computed by the algorithm described in the paper by Ertl et al.
- Complexity - The molecular complexity rating of a compound, computed using the Bertz/Hendrickson/Ihlenfeldt formula.
- Charge -The total (or net) charge of a molecule.
- HBondDonorCount- Number of hydrogen-bond donors in the structure.
- HBondAcceptorCount - Number of hydrogen-bond acceptors in the structure.
- RotatableBondCount - Number of rotatable bonds.
- HeavyAtomCount - Number of non-hydrogen atoms.
- IsotopeAtomCount - Number of atoms with enriched isotope(s)
- AtomStereoCount - Total number of atoms with tetrahedral (sp3) stereo [e.g., (R)- or (S)-configuration]
- DefinedAtomStereoCount - Number of atoms with defined tetrahedral (sp3) stereo.
- UndefinedAtomStereoCount - Number of atoms with undefined tetrahedral (sp3) stereo.
- BondStereoCount- Total number of bonds with planar (sp2) stereo [e.g., (E)- or (Z)-configuration].
- DefinedBondStereoCount - Number of atoms with defined planar (sp2) stereo.
- UndefinedBondStereoCount - Number of atoms with undefined planar (sp2) stereo.
- CovalentUnitCount - Number of covalently bound units.
- Volume3D - Analytic volume of the first diverse conformer (default conformer) for a compound.
- XStericQuadrupole3D - The x component of the quadrupole moment (Qx) of the first diverse conformer (default conformer) for a compound.
- YStericQuadrupole3D - The y component of the quadrupole moment (Qy) of the first diverse conformer (default conformer) for a compound.
- ZStericQuadrupole3D - The z component of the quadrupole moment (Qz) of the first diverse conformer (default conformer) for a compound.
- FeatureCount3D - Total number of 3D features (the sum of FeatureAcceptorCount3D, FeatureDonorCount3D, FeatureAnionCount3D, FeatureCationCount3D, FeatureRingCount3D and FeatureHydrophobeCount3D)
- FeatureAcceptorCount3D - Number of hydrogen-bond acceptors of a conformer.
- FeatureDonorCount3D - Number of hydrogen-bond donors of a conformer.
- FeatureAnionCount3D - Number of anionic centers (at pH 7) of a conformer.
- FeatureCationCount3D - Number of cationic centers (at pH 7) of a conformer. 
- FeatureRingCount3D - Number of rings of a conformer.
- FeatureHydrophobeCount3D - Number of hydrophobes of a conformer.
- ConformerModelRMSD3D - Conformer sampling RMSD in Å.
- EffectiveRotorCount3D - Total number of 3D features (the sum of FeatureAcceptorCount3D, FeatureDonorCount3D, FeatureAnionCount3D, FeatureCationCount3D, FeatureRingCount3D and FeatureHydrophobeCount3D)
- ConformerCount3D - The number of conformers in the conformer model for a compound.
- Fingerprint2D - Base64-encoded PubChem Substructure Fingerprint of a molecule.
*/
