export interface Post {
    _id: string;
    _createdAt: string;
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