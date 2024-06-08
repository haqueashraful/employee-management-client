import { useForm, Controller } from "react-hook-form";
import { DatePicker, Button, Input, Select } from "antd";
import moment from "moment";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import CommonTable from "../../Components/CommonTable";

const { Option } = Select;

const WorkSheet = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      task: "Sales",
      hours: "",
      date: moment(),
    },
  });

  const {
    data: works = [],
    refetch,
  } = useQuery({
    queryKey: ["works", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/works/${user?.email}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const newEntry = {
      ...data,
      date: data.date.format("YYYY-MM-DD"),
      userEmail: user.email,
    };

    try {
      await axiosPublic.post("/works", { ...newEntry, name: user.displayName });
      refetch();
      reset({
        task: "Sales",
        hours: "",
        date: moment(),
      });
    } catch (error) {
      console.error("Failed to add work entry", error);
    }
  };

  const columns = [
    {
      title: "Sl.No",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Hours Worked",
      dataIndex: "hours",
      key: "hours",
      render: (text) => `${text} hours`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div>
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold my-5">
          Work Sheet of {user?.displayName}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center my-5 gap-4 lg:gap-14 mb-4"
      >
        <Controller
          name="task"
          control={control}
          render={({ field }) => (
            <Select {...field} className="w-40">
              <Option value="Sales">Sales</Option>
              <Option value="Support">Support</Option>
              <Option value="Content">Content</Option>
              <Option value="Paper-work">Paper-work</Option>
            </Select>
          )}
        />
        <Controller
          name="hours"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              placeholder="Hours Worked"
              className="w-40"
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker {...field} defaultValue={moment()} className="w-40" />
          )}
        />
        <Button
          className=" !bg-blue-700/50 !text-white"
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </form>

      <div>
        <h1 className="text-center text-3xl text-black my-5">Work data</h1>
      </div>
      <div className="overflow-x-auto">
        <CommonTable data={works} columns={columns} />
      </div>
    </div>
  );
};

export default WorkSheet;
