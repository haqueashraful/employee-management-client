import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Card, List, Spin } from "antd";

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
        return <div className="flex justify-center items-center h-full"><Spin size="large" /></div>;
    }

    return (
        <div className="p-5">
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={contacts}
                renderItem={contact => (
                    <List.Item>
                        <Card title={contact.name} bordered={false}>
                            <p><strong>Email:</strong> {contact.email}</p>
                            <p><strong>Phone:</strong> {contact.phone}</p>
                            <p><strong>Message:</strong> {contact.message}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default AllContact;
