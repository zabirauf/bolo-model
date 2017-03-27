export interface MerkleLink {
    ['/']: string;
}

export interface MerklePseudoLink {
    ['link']: MerkleLink;
    [key: string]: MerkleValue;
}

export type MerkleValue = MerkleGraph 
| MerklePseudoLink 
| MerkleLink 
| MerkleGraph[]
| MerklePseudoLink[]
| MerkleLink[]
| string 
| number 
| boolean 
| string[] 
| number[] 
| boolean[];

export interface MerkleGraph {
    [key: string]: MerkleValue
}

export interface SerializeToIPLDFunc<T> {
    (obj: T): MerkleGraph
}

export interface DeserializeFromIPLDFunc<T> {
    (graph: MerkleGraph): T
}