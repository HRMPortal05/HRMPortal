import { useState } from "react";
import { FaBell } from "react-icons/fa";

const NoticeList = () => {
  const notices = [
    {
      id: 1,
      title: "Meeting Announcement",
      description: "Team meeting on Monday at 10:00 AM.",
      priority: "High",
    },
    {
      id: 2,
      title: "Holiday Notice",
      description: "Company holiday on September 25th.",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Project Deadline",
      description: "Submit all reports by September 28th.",
      priority: "Low",
    },
    {
      id: 4,
      title: "System Maintenance",
      description: "Scheduled system maintenance on October 1st.",
      priority: "Medium",
    },
    {
      id: 5,
      title: "Policy Update",
      description: "New company policy effective October 5th.",
      priority: "High",
    },
    {
      id: 6,
      title: "Training Session",
      description: "Mandatory training on October 10th.",
      priority: "Medium",
    },
    {
      id: 7,
      title: "Feedback Collection",
      description: "Please submit your feedback by October 15th.",
      priority: "Low",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPriority =
      priorityFilter === "All" || notice.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);

  // Slice the filtered notices for the current page
  const currentNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white p-8 pt-8 rounded-md w-full mt-3 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-primary_color flex items-center">
          <FaBell className="mr-2 text-form_base" size={32} />
          Notices
        </h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by title"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary_color focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary_color focus:outline-none"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentNotices.length > 0 ? (
          currentNotices.map((notice) => (
            <div
              key={notice.id}
              className={`p-6 rounded-md shadow-lg border-l-4 ${
                notice.priority === "High"
                  ? "bg-red-50 border-red-500"
                  : notice.priority === "Medium"
                  ? "bg-yellow-50 border-yellow-500"
                  : "bg-green-50 border-green-500"
              }`}
            >
              <h3 className="font-bold text-2xl text-primary_color">
                {notice.title}
              </h3>
              <p className="text-base text-para mt-4">{notice.description}</p>
              <p
                className={`text-sm font-semibold mt-2 ${
                  notice.priority === "High"
                    ? "text-red-600"
                    : notice.priority === "Medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                Priority: {notice.priority}
              </p>
            </div>
          ))
        ) : (
          <p className="text-para col-span-2 text-center">No notices found.</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="bg-light_primary text-white py-2 px-4 rounded-md disabled:opacity-50 hover:bg-primary_color transition-colors"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-para">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="bg-primary_color text-white py-2 px-4 rounded-md disabled:opacity-50 hover:bg-light_primary transition-colors"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NoticeList;
