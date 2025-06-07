import React from "react";

const Activity = (props) => {
    const activities = props.activities;
    return (
        <>
        <h3 className='section-title'>Recent activity in your boards</h3>
            {activities.map((activity, index) => (
                <div className="activity-entry" key={index}>
                <div className="user-tag u1" style={{backgroundColor: activity?.color}}>{activity?.username[0]}</div>
                <div className="activity-text">
                    <strong>{activity?.username}</strong> Finished task "{activity?.taskname}” in {activity?.boardname}
                </div>
                <div className="activity-time">{activity?.time}</div>
            </div>
        ))}
        </>
    )
}

export default Activity;