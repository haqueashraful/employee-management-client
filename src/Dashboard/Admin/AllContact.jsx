import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Card, List} from "antd";
import Loading from "../../Components/Loading";

const AllContact = () => {
    const axiosSecure = useAxiosSecure();

    const { data: contacts = [], isLoading } = useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            const res = await axiosSecure.get('/contacts');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loading />
    }

    return (
       <div>
         <h1 className="text-3xl font-bold mb-5 text-center">All Contact</h1>
         <div className="p-5">
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={contacts}
                renderItem={contact => (
                    <List.Item>
                        <Card title={contact.name}  className=" !border-blue-700/50">
                            <p><strong>Email:</strong> {contact.email}</p>
                            <p><strong>Phone:</strong> {contact.phone}</p>
                            <p><strong>Message:</strong> {contact.message}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
       </div>
    );
};

export default AllContact;
