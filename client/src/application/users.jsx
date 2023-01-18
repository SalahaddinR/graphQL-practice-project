import { useQuery } from "@apollo/client";
import User from "./user";
import { Loading } from "./generics";
import { GET_USERS } from "./grapQueries";

export default  function Users() {
    const {loading, error, data} = useQuery(GET_USERS);

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <p className="warning error">Oops, something went  wrong</p>
    }
    return (
        <>
            {!loading && !error ? 
                <section className="users">
                    <header className="row-headers">
                        <span className="name">First name & Last name</span>
                        <span className="email">Email</span>
                        <span className="empty"></span>
                    </header>
                    {data.users.map(
                        (element) => <User id={element.id} key={element.id} firstname={element.firstName} lastname={element.lastName} email={element.email} />
                    )}
                </section>
                :
                null
            }
        </>
    )
}