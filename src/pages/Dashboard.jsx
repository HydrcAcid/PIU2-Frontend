import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

import Popup from '../components/popup';
import SampleChart from '../components/sampleChart';
import Activity from '../components/activity';

import '../styles/Dashboard.css';

const lists2 = [
  {
    username: "Jan Kowalski",
    taskname: "Task 1",
    boardname: "Board 1",
    time: "14:26 23-03-2025",
    color: "#DFFF00"
  },
  {
    username: "Krzysztof Lejawka",
    taskname: "Task 14",
    boardname: "Board 2",
    time: "8:00 15-05-2025",
    color: "#6495ED"
  },
  {
    username: "Andrzej Andrzejewski",
    taskname: "Task 14",
    boardname: "Board 2",
    time: "12:05 01-06-2025",
    color: "##9FE2BF"
  },
  {
    username: "August Augustyn",
    taskname: "Task 14",
    boardname: "Board 2",
    time: "21:47 01-01-2025",
    color: "#DE3163"
  }
]

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [createPopup, setCreatePopup] = useState(false);
  const [joinPopup, setJoinPopup] = useState(false);
  const [codeIncorrect, setCodeIncorrect] = useState(false);

  const fetchData = async () => {
    await axios.get('http://localhost:3000/dash/info', { withCredentials: true })
      .then((resp) => {
        setBoards(resp.data);
      }).catch((err) => {
        console.error('Error fetching data:', err);
      });
  };

  const onBoardCreate = async (data) => {
    const boardname = data.get('name');
    setCreatePopup(false);
    await axios.post('http://localhost:3000/board/add', { name: boardname }, { withCredentials: true })
      .then((resp) => {
        console.log(resp);
        fetchData();
      }).catch((err) => {
        console.error('Error while creating a board:', err);
      });
  }

  const onBoardJoin = async (data) => {
    const boardname = data.get('name');
    console.log(boardname);
    await axios.post(`http://localhost:3000/board/join`, { code: boardname }, { withCredentials: true })
      .then((resp) => {
        setJoinPopup(false);
        fetchData();
      }).catch((err) => {
        if (err.status == 404) {
          setCodeIncorrect(true);
        }
        console.error('Error while creating a board:', err);
      });
  }

  useEffect(() => {
    if (currentUser === null) {
      window.location.href = '/login';
    }
    fetchData();
  }, []);


  return (
    <div className="dashboard">
      <Popup title={"Enter new board name:"} setPopup={setCreatePopup} popup={createPopup} action={onBoardCreate} incorrect={false} setIncorrect={setCodeIncorrect} />
      <Popup title={"Enter invite code:"} setPopup={setJoinPopup} popup={joinPopup} action={onBoardJoin} incorrect={codeIncorrect} setIncorrect={setCodeIncorrect} incorrectMsg={"Invalid code"} />

      <aside className="sidebar">
        <div className="profile">
          <div className="avatar" style={{ backgroundColor: currentUser?.color }}>{currentUser?.username[0]}</div>
          <h2 className="username">{currentUser?.username}</h2>
          <p className="email">{currentUser?.email}</p>
        </div>
        <hr className='separator' />
        <div className="sidebar-links">
          <button onClick={(e) => { e.preventDefault(); setJoinPopup(true) }}>Join existing board</button>
          <button onClick={(e) => { e.preventDefault(); setCreatePopup(true) }}>Create new board</button>
        </div>
      </aside>

      <main className="main-content">
        <div className='boards-column'>
          <section className="boards-overview">
            {boards.map((board, index) => (
              <div className="board-card board" key={board.id} onClick={() => window.location.href = `/board/${board.id}`}>
                <h3 style={{ backgroundColor: board?.color }}>{board?.name}</h3>
                <p className='task-desc'>Members: {board?.permission_count}</p>
              </div>
            ))}
          </section>
        </div>

        <div className='team-column'>
          <section className="performance-section">
            <h3 className='section-title'>Your monthly performance</h3>
            <div className="performance-graph">
              <SampleChart />
            </div>
            <div className="task-label">Finished tasks: 56</div>
          </section>

          <section className="activity-section">
            <Activity activities={lists2} />
          </section>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
