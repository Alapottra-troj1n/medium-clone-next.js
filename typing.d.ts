export interface Post {
    _id: string;
    author: {
        name: string;
        image: string;
    },
    body: [object],
    mainImage: {},
    slug: {
        _type : string,
        current : string
    }

}