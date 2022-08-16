export interface Post {
    _id: string;
    title: string;
    author: {
        name: string;
        image: any;
    },
    body: [object],
    mainImage: {},
    slug: {
        _type : string,
        current : string
    }

}