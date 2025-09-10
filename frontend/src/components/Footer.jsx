import React from "react";

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="p-4 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                <span className="text-yellow-500">🎉</span>
                Tuyệt vời! Bạn đã hoàn thành {completedTasksCount} việc
                {activeTasksCount > 0 &&
                  `, còn ${activeTasksCount} việc nữa thôi. Cố lên!`}
              </>
            )}
            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>
                <span className="text-blue-500">🚀</span>
                Hãy bắt đầu làm {activeTasksCount} nhiệm vụ nào!
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
