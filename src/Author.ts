import {SerializeToIPLDFunc, DeserializeFromIPLDFunc, MerkleGraph} from './IpfsTypes';

interface Author {
    id: string;
    name: string;
    bio: string;
}

export default Author;

export const serialize: SerializeToIPLDFunc<Author> = function serialize(obj: Author): MerkleGraph {
    const graph: MerkleGraph = {
        'id': obj.id,
        'name': obj.name,
        'bio': obj.bio
    }

    return graph;
}

export const deserialize: DeserializeFromIPLDFunc<Author> = function deserialize(graph: MerkleGraph): Author {
    const obj: Author = {
        id: <string>graph['id'],
        name: <string>graph['name'],
        bio: <string>graph['bio']
    }

    return obj;
}