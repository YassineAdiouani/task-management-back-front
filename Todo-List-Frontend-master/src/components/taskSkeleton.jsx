import React from 'react';

export default function TaskSkeleton() {
  return (
    <div className="task-skeleton">
      <div className="task-header-skeleton">
        <div className="input-skeleton"></div>
        <div className="task-actions-skeleton">
          <div className="icon-skeleton"></div>
          <div className="icon-skeleton"></div>
        </div>
      </div>
      <div className="task-description-skeleton">
        <div className="line-skeleton"></div>
        <div className="line-skeleton"></div>
      </div>
      <div className="task-status-skeleton">
        <div className="status-skeleton"></div>
      </div>
    </div>
  );
}