import {SerializeToIPLDFunc, DeserializeFromIPLDFunc, MerkleGraph, MerkleLink} from './IpfsTypes';
import Author, {serialize as authorSerialize, deserialize as authorDeserialize} from './Author';
import PostTag, {serialize as postTagSerialize, deserialize as postTagDeserialize} from './PostTag';

interface BoloPost {
    title: string;
    markdown: string;
    tags: PostTag[];
    author: Author;
    publishedAt: Date;
    updatedAt: Date;
    previousIterationId: string;
}

export default BoloPost;

export const serialize: SerializeToIPLDFunc<BoloPost> = function(obj: BoloPost): MerkleGraph {
    const graph: MerkleGraph = {
        'title': obj.title,
        'markdown': obj.markdown,
        'tags': obj.tags ? obj.tags.map(postTagSerialize) : [],
        'author': obj.author ? authorSerialize(obj.author) : null,
        'publishedAt': obj.publishedAt.toDateString(),
        'updatedAt': obj.updatedAt.toDateString(),
        'previousIteration': obj.previousIterationId ? <MerkleLink> {'/': obj.previousIterationId} : null,
    }

    return graph;
}

export const deserialize: DeserializeFromIPLDFunc<BoloPost> = function(graph: MerkleGraph): BoloPost {
    const obj: BoloPost = {
        title: <string> graph['title'],
        markdown: <string> graph['markdown'],
        tags: (<MerkleGraph[]> graph['tags']).map(postTagDeserialize),
        author: graph['author'] ? authorDeserialize(<MerkleGraph>graph['author']) : null,
        publishedAt: new Date(<string> graph['publishedAt']),
        updatedAt: new Date(<string> graph['updatedAt']),
        previousIterationId: graph['previousIteration'] ? (<MerkleLink> graph['previousIteration'])['/'] : null
    }

    return obj;
}