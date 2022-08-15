export interface Post {
    _id: string;
    author: {
        name: string;
        image: string;
    },
    body: [object],
    mainImage: {
        asset : {
            _ref: string
        }
    },
    slug: {
        current : string
    }

}