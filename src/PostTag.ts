import {SerializeToIPLDFunc, DeserializeFromIPLDFunc, MerkleGraph} from './IpfsTypes';

interface PostTag {
    name: string;
    description: string;
}

export default PostTag;

export const serialize: SerializeToIPLDFunc<PostTag> = function(obj: PostTag): MerkleGraph {
    const graph: MerkleGraph = {
        'name': obj.name,
        'description': obj.description
    };

    return graph;
}

export const deserialize: DeserializeFromIPLDFunc<PostTag> = function(graph: MerkleGraph): PostTag {
    const obj: PostTag = {
        name: <string> graph['name'],
        description: <string> graph['description']
    }

    return obj;
}