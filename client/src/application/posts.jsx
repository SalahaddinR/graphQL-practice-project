import { useQuery } from "@apollo/client";
import { GET_POSTS} from "./grapQueries";
import { Loading } from "./generics";
import Post from "./post";

export default function Posts() {
    const {loading, error, data} = useQuery(GET_POSTS);
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <p className="warning error">Oops, something went  wrong</p>
    }

    return (
        <>
            {!loading && !error ? 
                <section className="posts">
                    {
                        data.posts.map(
                            (element) => <Post id={element.id} key={element.id} title={element.title} content={element.content} userId={element.userId}/>
                        )
                    }
                </section>
                :
                null
            }
        </>
    )
}